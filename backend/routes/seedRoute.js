import express from 'express';
import Book from '../models/bookModel.js';
import Link from '../models/linkModel.js';
import User from '../models/userModel.js';
import data from '../manifest.js';
import Author from '../models/authorModel.js';
const seed = express.Router();

seed.get('/all', async (req, res) => {
  //seed user
  //seed book
  // seed user
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);

  console.log('r1');
  await Book.remove({});
  var seedSeller = createdUsers[0];
  data.books.forEach((x) => {
    x.seller = seedSeller._id;
  });
  const createdBook = await Book.insertMany(data.books);

  await Author.remove({});

  for (let i = 0; i < data.authors.length; i++) {
    for (let j = 0; j < data.authors[i].bookSeed.length; j++) {
      data.authors[i].books.push(createdBook[data.authors[i].bookSeed[j]]);
    }
  }

  const createdAuthor = await Author.insertMany(data.authors);
  res.send({ createdBook, createdUsers });
});

seed.get('/book', async (req, res) => {
  //seed book
  await Book.remove({});
  const createdBook = await Book.insertMany(data.books);
  res.send(createdBook);
});

seed.get('/user', async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  console.log(data.user);
  res.send(createdUsers);
});
seed.get('/link', async (req, res) => {
  await Link.remove({});
  const createdLinks = await Link.insertMany(data.links);
  console.log(data.links);
  res.send(createdLinks);
});
export default seed;
