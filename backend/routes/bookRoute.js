import express from 'express';
import Book from '../models/bookModel.js';

const bookRoute = express.Router();

bookRoute.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

bookRoute.get('/slug/:slug', async (req, res) => {
  const book = await Book.findOne({ slug: req.params.slug });
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});

bookRoute.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});
export default bookRoute;
