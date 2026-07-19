import mysql from "mysql2/promise";

// DB connection
export const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD || "",
  database: process.env.DBDATABASE,
  port: process.env.DBPORT || 3306,
});

db.getConnection()
  .then((connection) => {
    connection.release();
    console.log("MySQL Connected Successfully!");
  })
  .catch((err) => {
    console.error("DB connection failed:");
    console.error(err.message);
  });


