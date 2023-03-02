import express from 'express';
import Link from '../models/linkModel.js';

const linkRoute = express.Router();
linkRoute.get('/', async (req, res) => {
  const links = await Link.find();
  res.send(links);
});
export default linkRoute;
