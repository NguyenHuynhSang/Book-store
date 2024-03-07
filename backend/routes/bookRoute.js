import express, { query } from 'express';
import Book from '../models/bookModel.js';
import Author from '../models/authorModel.js';
import { isAuth, sellerOrAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
const PAGE_SIZE = 5;
const bookRoute = express.Router();

bookRoute.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

bookRoute.get('/seller/products', async (req, res) => {
  const seller = req.body.query.seller || '';
  const filter = seller ? { seller } : {};
  const books = await Book.find(...filter);
  res.send(books);
});

bookRoute.get('/products', isAuth, sellerOrAdmin, async (req, res) => {
  var sort = req.query.sort;
  const order = sort.isUp === 'true' ? 1 : -1;

  const sortOrder =
    sort.field === 'id'
      ? { _id: order }
      : sort.field === 'name'
      ? { name: order }
      : sort.field === 'createAt'
      ? { createdAt: order }
      : sort.field === 'price'
      ? { price: order }
      : sort.field === 'countInStock'
      ? { countInStock: order }
      : { _id: -1 };

  const sellerId = req.user._id;
  const sellerFilter =
    req.user.role && req.user.role !== 'user'
      ? {
          seller: {
            $eq: sellerId,
          },
        }
      : {};
  console.log(sellerFilter);
  const pageSize = PAGE_SIZE;
  const page = req.query.page || 1;

  const books = await Book.find({ seller: sellerId })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countBooks = await Book.countDocuments();
  res.send({
    books,
    page,
    pages: Math.ceil(countBooks / pageSize),
    countBooks,
  });
});

bookRoute.get('/search', async (req, res) => {
  console.log('call filter');
  const { query } = req;

  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const searchQuery = query.query.toLowerCase() || '';
  const rating = query.rating || '';
  const price = query.price || '';
  const order = query.order || 'latest';
  console.log('query.price' + query.price);

  ///Currently bug with unicode character
  // return unfound if there have unicode character in search query
  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i', // lower case compare
          },
        }
      : {};

  const categoryFilter =
    category && category !== 'all'
      ? {
          'caterories.name': {
            $eq: category,
          },
        }
      : {};
  console.log('rating: ' + rating);
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: parseInt(rating),
          },
        }
      : {};

  console.log(ratingFilter);
  console.log('filter 2' + price);

  const priceFilter =
    price && price != 'all'
      ? {
          // 1-150
          price: {
            $gte: parseInt(price.split('-')[0]),
            $lte: parseInt(price.split('-')[1]),
          },
        }
      : {};

  const sortOrder =
    order === 'featured'
      ? { featured: -1 }
      : order === 'latest'
      ? { _id: -1 }
      : order === 'oldest'
      ? { createdAt: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'lowest'
      ? { price: 1 }
      : order === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };
  console.log(sortOrder);
  const books = await Book.find({
    ...queryFilter,
    ...priceFilter,
    ...categoryFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countBooks = await Book.countDocuments({
    ...queryFilter,
    ...priceFilter,
    ...categoryFilter,
    ...ratingFilter,
  });

  res.send({
    books,
    countBooks,
    page,
    pages: Math.ceil(countBooks / pageSize),
  });
});

bookRoute.get('/categories', async (req, res) => {
  const categories = await Book.find()
    .sort({ 'caterories.order': -1 })
    .distinct('caterories.name');

  res.send(categories);
});

bookRoute.get('/authors', async (req, res) => {
  const authors = await Author.find();
  let resAuthor = authors.map(({ _id, name }) => ({ _id, name }));

  res.send(resAuthor);
});

//it works but it look bad lmao
// need to find a better solution
bookRoute.get('/slug/:slug', async (req, res) => {
  const book = await Book.findOne({ slug: req.params.slug });

  const authors = await Author.find({
    books: {
      $eq: book._id,
    },
  });

  const resData = {
    ...book._doc,
    authors: [...authors],
  };

  if (resData) {
    res.send(resData);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});

bookRoute.get('/:id', async (req, res) => {
  console.log('call get book by id api');
  console.log(req.params);
  const book = await Book.findById(req.params.id);
  console.log(book);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});

bookRoute.post(
  '/create',
  isAuth,
  sellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log('called create api');
    console.log(req.body.category);
    console.log('user call this api');
    console.log(req.user);
    console.log('book name');
    console.log(req.body.bookName);
    const newBook = new Book({
      name: req.body.bookName,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      seller: req.user._id,
      countInStock: req.body.countInStock,
      dimensions: req.body.dimensions,
      language: req.body.language,
      image: image ? image : '/imgs/n2.webp',
      numPage: req.body.numPage,
      caterories: req.body.category,
      publisher: req.body.publisher,
      publishDate: req.body.publishDate,
    });
    newBook.slug += newBook._id;
    newBook.caterories = req.body.category;
    console.log('new book');
    console.log(newBook);
    const book = await newBook.save();
    console.log('saved');
    res.send({
      _id: book.id,
      name: book.name,
    });
  })
);
export default bookRoute;
