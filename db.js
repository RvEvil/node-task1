const Pool = require("pg").Pool

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "task1",
	password: "root",
	port: 5432,
})

module.exports = pool
