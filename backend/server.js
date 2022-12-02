import express from 'express';
import data from './tempdata.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seed from './routes/seedRoute.js';

// load data from .env to process
const uri = 'mongodb://0.0.0.0:27017/book-store';

const app = express();
dotenv.config();
// connect Db

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database');
    console.log(error.message);
  });
//app.use('/api/seed', seed);
//app.use(express.json());
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
