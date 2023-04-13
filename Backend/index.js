import cors from "cors";
import express from "express";
import mysql2 from "mysql2";

const app = express();

//connecting to mysql DB
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty@123",
  database: "test",
});

app.use(express.json());
app.use(cors());

//how we can reach our backend server or rather how we create api requests using an express server
app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });

  app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("book has been created successfully");
    });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id =?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book was deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE  books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id =?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book was updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
