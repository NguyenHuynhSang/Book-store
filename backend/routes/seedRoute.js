import express from 'express';
import Book from '../models/book.js';
import data from '../tempdata.js';
const seed = express.Router();

seed.get('/', async (req, res) => {
  await Book.remove({});
  const createdBook = await Book.insertMany(data.Book);
  res.send({ createdBook });
});

export default seed;
