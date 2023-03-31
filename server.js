const express = require("express")
const app = express()

const UserRoutes = require("./src/Routes/routes")

const port = 3000
app.use(express.json())

app.get("/", (req, res) => {
	res.send("Welcome To a Task 1!")
})

app.use("/home", UserRoutes)

app.listen(port, () => console.log("Server started on port 3000"))
