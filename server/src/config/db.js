import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const app = express();

app.use(express.json());

// DB connection
export const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD || "",
  database: process.env.DBDATABASE,
  port: process.env.DBPORT || 3306,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("DB connection failed:");
    console.error(err.message);
    return;
  }
  console.log("MySQL Connected Successfully!");
});


