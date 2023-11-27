// SERVER CONFIG
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

// CONNECTION DATABASE CONFIG
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bestevents123",
  database: "moedaestudantil",
});

module.exports.connection = connection;

//INICIALIZATION CONNECTION WITH DATABASE
connection.connect();

//CONNECTION TEST
connection.query("SELECT 1+1 AS solution", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
});

app.use(cors({ origin: "*" }));

const router = require("./src/router");
app.use("/", router);

// INICIALIZE NODE SERVER
app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
