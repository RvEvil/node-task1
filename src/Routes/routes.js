const { Router } = require("express")
const controller = require("../Controllers/controller")
const middleware = require("../Middleware/middleware")
const router = Router()
const upload = require("../Csv_Multer/csvmulter")

router.post("/userSignup", controller.signUp)
router.post("/login", controller.login)
router.post(
	"/login/Enroll",
	middleware.authenticateUser,
	controller.courseEnroll
)
router.get("/login/courses", middleware.authenticateUser, controller.getCourses)
router.post(
	"/login/admin/createuser",
	middleware.authenticateUser,
	middleware.isAdmin,
	controller.signUp
)

router.get(
	"/login/admin/allusers",
	middleware.authenticateUser,
	middleware.isAdmin,
	controller.getAllUsers
)

router.get(
	"/login/admin/:id",
	middleware.authenticateUser,
	middleware.isAdmin,
	controller.getUser
)

router.put(
	"/login/admin/:id",
	middleware.authenticateUser,
	middleware.isAdmin,
	controller.updateUser
)

router.delete(
	"/login/admin/:id",
	middleware.authenticateUser,
	middleware.isAdmin,
	controller.deleteUser
)

router.post(
	"/login/admin/uploadCsv",
	middleware.authenticateUser,
	middleware.isAdmin,
	upload.single("file"),
	controller.uploadCsv
)

module.exports = router
