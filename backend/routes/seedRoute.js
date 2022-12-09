import express from 'express';
import Book from '../models/bookModel.js';
import User from '../models/userModel.js';
import data from '../tempdata.js';
const seed = express.Router();

seed.get('/', async (req, res) => {
  //seed book
  await Book.remove({});
  const createdBook = await Book.insertMany(data.books);

  // seed user
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  console.log(data.user);
  res.send({ createdBook, createdUsers });
});

export default seed;
