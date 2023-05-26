import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';
const userRoute = express.Router();

userRoute.post(
  '/login',

  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          token: generateToken(user),
        });
      }
    }
    res.status(401).send({ message: 'Sai thong tin dang nhap' });
  })
);

userRoute.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    console.log('called api');
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      username: req.body.username,
    });
    const checkUser = await User.findOne({
      username: req.body.username.toLowerCase(),
    });
    if (checkUser) {
      res.status(401).send({ message: 'Ten user bi trung' });
      return;
    }
    const user = await newUser.save();
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user),
    });
  })
);
export default userRoute;
