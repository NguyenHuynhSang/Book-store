import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth } from '../utils.js';
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
          role: user.role,
          token: generateToken(user),
        });
      }
    }
    res.status(401).send({ message: 'Sai thong tin dang nhap' });
  })
);

userRoute.get(
  '/list',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    var filter = req.query.filter;
    var filterProp = req.query.filterProp;

    const filterRegex =
      filter && filter !== ''
        ? {
            [filterProp]: {
              $regex: filter,
              $options: 'i', // lower case compare
            },
          }
        : {};
    console.log(req.query);
    console.log(filterRegex);

    const user = await User.find(filterRegex);
    res.send(user);
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

userRoute.delete(
  '/delete/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log('res_delete');
    console.log(req.params._id);
    const user = await User.findById(req.params.id);

    console.log(user);
    if (user && user.role != 'admin') {
      const deletedUser = await user.remove();
      res.send({ message: 'User deleted', user: deletedUser });
    } else {
      res.status(404).send({ message: 'Not Found' });
    }
  })
);

userRoute.put(
  '/update',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('call update');
    const user = await User.findById(req.user._id);
    console.log(1);
    if (user) {
      console.log(2);
      user.name = req.body.name;
      user.email = req.body.email;
      if (req.user.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      console.log(user);
      const updatedUser = await user.save();
      console.log(4);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: user.role,
        password: updatedUser.password,
      });
    } else {
      res.status(404).send({ message: 'not Found' });
    }
  })
);
export default userRoute;
