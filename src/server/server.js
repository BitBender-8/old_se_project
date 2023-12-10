const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "y3_se_project",
  password: "password",
  port: "5432"
});

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the book API!" });
});

app.get("/search/:searchTerm", async (req, res) => {
  try {
    // Build the query with parameterized queries
    const queryTerm = req.params.searchTerm;

    // Check if the searchTerm is a valid number
    if (!isNaN(queryTerm)) {
      // If it's a number, perform a query specific to ISBN
      const query = "SELECT * FROM book WHERE CAST(isbn AS TEXT) LIKE $1";
      const { rows } = await pool.query(query, [`%${queryTerm}%`]);
      console.log(rows);
      res.status(200).json(rows);
    } else {
      // If it's not a number, perform a query for title or authors
      const query = "SELECT * FROM book WHERE title ILIKE $1 OR authors ILIKE $1";
      const { rows } = await pool.query(query, [`%${queryTerm}%`]);
      console.log(rows);
      res.status(200).json(rows);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while searching for books." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

