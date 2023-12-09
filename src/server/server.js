const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const { Pool, Client } = require('pg');

const data = [
  {
    title: "Book Title 1",
    cover_page: "cover_page_1.jpg",
    author: "Author 1",
    ISBN: "533-590-798-733",
    genre: "Biography",
    publisher: "Publisher 1",
    publication_date: "1914-02-26",
    print_version: true,
    language: "Japanese",
    synopsis:
      "This is a synopsis of Book 1. It is a brief description of the book's content.",
    rating: "2"
  },
  {
    title: "Book Title 2",
    cover_page: "cover_page_2.jpg",
    author: "Author 2",
    ISBN: "808-404-844-717",
    genre: "Non-Fiction",
    publisher: "Publisher 2",
    publication_date: "1989-12-14",
    print_version: true,
    language: "French",
    synopsis:
      "This is a synopsis of Book 2. It is a brief description of the book's content.",
      rating: "2"
  },
  {
    title: "Book Title 3",
    cover_page: "cover_page_3.jpg",
    author: "Author 3",
    ISBN: "609-723-213-468",
    genre: "Science",
    publisher: "Publisher 3",
    publication_date: "2004-12-04",
    print_version: true,
    language: "French",
    synopsis:
      "This is a synopsis of Book 3. It is a brief description of the book's content.",
      rating: "2"
  },
  {
    title: "Book Title 4",
    cover_page: "cover_page_4.jpg",
    author: "Author 4",
    ISBN: "318-303-130-367",
    genre: "History",
    publisher: "Publisher 4",
    publication_date: "2015-01-23",
    print_version: true,
    language: "Japanese",
    synopsis:
      "This is a synopsis of Book 4. It is a brief description of the book's content.",
      rating: "2"
  },
  {
    title: "Book Title 5",
    cover_page: "cover_page_5.jpg",
    author: "Author 5",
    ISBN: "108-934-132-471",
    genre: "Biography",
    publisher: "Publisher 5",
    publication_date: "1997-07-25",
    print_version: false,
    language: "Japanese",
    synopsis:
      "This is a synopsis of Book 5. It is a brief description of the book's content.",
      rating: "2"
  },
  {
    title: "Book Title 6",
    cover_page: "cover_page_6.jpg",
    author: "Author 6",
    ISBN: "461-798-292-204",
    genre: "Science",
    publisher: "Publisher 6",
    publication_date: "1905-04-22",
    print_version: true,
    language: "German",
    synopsis:
      "This is a synopsis of Book 6. It is a brief description of the book's content.",
      rating: "2"
  },
  {
    title: "Book Title 7",
    cover_page: "cover_page_7.jpg",
    author: "Author 7",
    ISBN: "157-599-661-246",
    genre: "Biography",
    publisher: "Publisher 7",
    publication_date: "1932-11-15",
    print_version: false,
    language: "Japanese",
    synopsis:
      "This is a synopsis of Book 7. It is a brief description of the book's content.",
      rating: "2"
  },
  {
    title: "Book Title 8",
    cover_page: "cover_page_8.jpg",
    author: "Author 8",
    ISBN: "975-695-849-381",
    genre: "Science",
    publisher: "Publisher 8",
    publication_date: "1916-06-20",
    print_version: true,
    language: "Spanish",
    synopsis:
      "This is a synopsis of Book 8. It is a brief description of the book's content.",
      rating: "2"
  },
  {
    title: "Book Title 9",
    cover_page: "cover_page_9.jpg",
    author: "Author 9",
    ISBN: "291-188-312-198",
    genre: "Non-Fiction",
    publisher: "Publisher 9",
    publication_date: "1999-08-19",
    print_version: true,
    language: "German",
    synopsis:
      "This is a synopsis of Book 9. It is a brief description of the book's content.",
      rating: "2"
  },
  {
    title: "Book Title 10",
    cover_page: "cover_page_10.jpg",
    author: "Author 10",
    ISBN: "803-974-992-508",
    genre: "Fiction",
    publisher: "Publisher 10",
    publication_date: "1957-03-03",
    print_version: true,
    language: "English",
    synopsis:
      "This is a synopsis of Book 10. It is a brief description of the book's content.",
      rating: "2"
  },
];

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
    const query = "SELECT * FROM book WHERE (title ILIKE $1 OR title ILIKE $2 OR title ILIKE $3)\
                   OR (authors ILIKE $1 OR authors ILIKE $2 OR authors ILIKE $3)";
    
    // Use parameterized queries to prevent SQL injection
    const { rows } = await pool.query(query, [`%${queryTerm}%`, `${queryTerm}%`, `%${queryTerm}`]);
    
    console.log(rows);
    res.status(200).json({
      status: "success",
      data: {
        results: rows,
        length: rows.length    
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while searching for books." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

