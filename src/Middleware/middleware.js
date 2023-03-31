const jwt = require("jsonwebtoken")
const { login } = require("../Controllers/controller")

const isAdmin = (req, res, next) => {
	if (req.admin) {
		next()
	} else {
		res.status(401).json({ error: "You don't have access for this" })
	}
}

const authenticateUser = (req, res, next) => {
	const authHeader = req.headers.authorization
	if (authHeader) {
		const token = authHeader.split(" ")[1]
		jwt.verify(token, "mysecretkey", (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "Unauthorized" })
			} else {
				req.userId = decoded.userId
				req.roleId = decoded.roleId
				if (req.roleId === 3) req.admin = true
				next()
			}
		})
	} else {
		res.status(403).json({ error: "Unauthorized" })
	}
}

module.exports = {
	isAdmin,
	authenticateUser,
}
