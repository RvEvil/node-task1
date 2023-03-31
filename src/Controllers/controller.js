const jwt = require("jsonwebtoken")
const pool = require("../../db")
const queries = require("../Queries/queries")
const csv = require("csv-parser")
const fs = require("fs")

const signUp = async (req, res) => {
	try {
		const { username, email, password, roleid } = req.body

		const checkUser = await pool.query(queries.CheckUserExists, [email])
		if (checkUser.rows.length) {
			return res.status(400).json({ error: "User already exists" })
		}

		const newUser = await pool.query(queries.UserSignUp, [
			username,
			email,
			password,
			roleid,
		])
		if (newUser.rowCount === 0) {
			return res.status(400).json({ error: "Failed to create user" })
		}

		res.status(201).json({ message: "User signed up successfully!" })
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "Internal server error" })
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		const checkUser = await pool.query(queries.CheckUserExists, [email])
		if (!checkUser.rows.length) {
			return res.status(400).json({ error: "User not found" })
		}

		const user = checkUser.rows[0]

		if (password !== user.password) {
			return res.status(400).json({ error: "Invalid password" })
		}

		const token = jwt.sign(
			{ userId: user.userid, roleId: user.roleid },
			"mysecretkey"
		)

		res.status(200).json({ token })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const courseEnroll = async (req, res) => {
	try {
		const { courseid } = req.body
		const userId = req.userId

		const checkCourse = await pool.query(queries.CheckCourseExists, [courseid])
		if (!checkCourse.rows.length) {
			return res.status(402).json({ error: "Course not found" })
		}

		const checkEnrollment = await pool.query(queries.CheckUserEnrollment, [
			userId,
			courseid,
		])
		if (checkEnrollment.rows.length) {
			return res
				.status(400)
				.json({ error: "You are already enrolled in this course" })
		}

		const enroll = await pool.query(queries.UserCourseEnrollment, [
			userId,
			courseid,
		])
		if (enroll.rowCount === 0) {
			return res.status(500).json({ error: "Failed to enroll in the course" })
		}

		res.status(200).json({ message: "Successfully enrolled in the course!" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const getCourses = async (req, res) => {
	try {
		const userId = req.userId

		const userCourses = await pool.query(queries.GetUserCourses, [userId])
		if (!userCourses.rows.length) {
			return res
				.status(404)
				.json({ error: "You are not enrolled to any courses" })
		}

		const courses = userCourses.rows.map((row) => {
			return {
				courseId: row.courseid,
				courseName: row.coursename,
				courseFee: row.coursefee,
				courseCredit: row.coursecredit,
				courseFormat: row.courseformat,
			}
		})

		res.status(200).json({ courses })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await pool.query(queries.GetAllUsers, [])
		if (!allUsers.rows.length) {
			return res.status(404).json({ error: "There are no users" })
		}

		const users = allUsers.rows.map((row) => {
			return {
				userid: row.userid,
				username: row.username,
				email: row.email,
				password: row.password,
				roleid: row.roleid,
			}
		})

		res.status(200).json({ users })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const getUser = async (req, res) => {
	try {
		const userid = parseInt(req.params.id)

		const allUsers = await pool.query(queries.GetUser, [userid])
		if (!allUsers.rows.length) {
			return res.status(404).json({ error: "There is no such user" })
		}

		const user = allUsers.rows

		res.status(200).json(user)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const updateUser = async (req, res) => {
	try {
		const userid = parseInt(req.params.id)

		const { username, email, password, roleid } = req.body

		const checkUser = await pool.query(queries.GetUser, [userid])
		if (!checkUser.rows.length) {
			return res.status(400).json({ error: "User does not exist" })
		}

		const updatedUser = await pool.query(queries.UpdateUser, [
			username,
			email,
			password,
			roleid,
			userid,
		])

		if (updatedUser.rowCount === 0) {
			return res.status(400).json({ error: "Failed to update user" })
		}

		res.status(201).json({ message: "User updated successfully!" })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: "Internal server error" })
	}
}
const deleteUser = async (req, res) => {
	try {
		const userIdToDelete = parseInt(req.params.id)

		const checkUser = await pool.query(queries.GetUser, [userIdToDelete])
		if (!checkUser.rows.length) {
			return res.status(404).json({ error: "User not found" })
		}

		const deleteUserCourse = await pool.query(queries.DeleteUserCourse, [
			userIdToDelete,
		])

		const deleteUser = await pool.query(queries.DeleteUser, [userIdToDelete])
		if (deleteUser.rowCount === 0) {
			return res.status(500).json({ error: "Failed to delete user" })
		}

		res.status(200).json({ message: "User deleted successfully!" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const uploadCsv = async (req, res) => {
	const results = []
	const file = req.file

	if (!file) {
		res.status(400).send("No file uploaded.")
		return
	}

	const stream = csv({
		headers: ["username", "email", "password", "roleid"],
		skipLines: 1,
	})
		.on("error", (err) => {
			console.error(err)
			res.status(500).send("Error processing CSV file.")
		})
		.on("data", (data) => {
			results.push(data)
		})
		.on("end", async () => {
			let client
			try {
				client = await pool.connect()
				await client.query("BEGIN")

				for (let result of results) {
					await client.query(queries.UserSignUp, [
						result.username,
						result.email,
						result.password,
						result.roleid,
					])
				}

				await client.query("COMMIT")
				res.status(200).send(`${results.length} records uploaded.`)
			} catch (err) {
				console.error(err)
				if (client) {
					await client.query("ROLLBACK")
				}
				res.status(500).send("Error uploading records.")
			} finally {
				if (client) {
					client.release()
				}
			}
		})

	stream.on("error", (err) => {
		console.error(err)
		res.status(500).send("Error processing CSV file.")
	})

	fs.createReadStream(file.path).pipe(stream)
}

module.exports = {
	signUp,
	login,
	courseEnroll,
	getCourses,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	uploadCsv,
}
