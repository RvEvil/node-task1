const CheckUserExists = "SELECT * from users where email=$1"

const UserSignUp =
	"insert into users(username, email, password, roleId) values($1,$2,$3,$4)"

const CheckCourseExists = "SELECT * from course where courseId=$1"

const CheckUserEnrollment =
	"SELECT * from usercourse where userId=$1 AND courseId=$2"

const UserCourseEnrollment =
	"INSERT INTO usercourse(userId, courseId) values($1,$2)"

const GetUserCourses =
	"select c.Courseid,c.CourseName,c.Coursefee,c.CourseCredit,c.courseformat from usercourse us inner join course c on us.courseid=c.courseid where us.userid=$1"

const GetAllUsers = "SELECT * FROM users"

const GetUser = "SELECT * FROM users where userid=$1"

const UpdateUser =
	"Update users set username=$1, email=$2, password=$3, roleid=$4 where userid=$5"

const DeleteUser = "delete from users where userid=$1"

const DeleteUserCourse = "delete from usercourse where userid=$1"

module.exports = {
	CheckUserExists,
	UserSignUp,
	CheckCourseExists,
	CheckUserEnrollment,
	UserCourseEnrollment,
	GetUserCourses,
	GetAllUsers,
	GetUser,
	UpdateUser,
	DeleteUser,
	DeleteUserCourse,
}
