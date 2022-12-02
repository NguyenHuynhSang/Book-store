import express from 'express';
import data from './tempdata.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// load data from .env to process
dotenv.config();
// connect Db
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('DB Loaded');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
  res.send(data.books);
});
app.get('/api/books/slug/:slug', (req, res) => {
  const book = data.books.find((x) => x.slug === req.params.slug);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});

app.get('/api/books/:id', (req, res) => {
  const book = data.books.find((x) => x.id == req.params.id);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
