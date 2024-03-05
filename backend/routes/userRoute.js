import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth } from '../utils.js';
const userRoute = express.Router();
userRoute.post(
  '/login',

  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      username: req.body.username.toLowerCase(),
    });
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
          sellername: user.seller.name,
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
      role: req.body.role,
      seller: {
        name: req.body.sellerName,
        logo: req.body.sellerLogo,
        description: req.body.description,
      },
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
      if (user.role === 'seller') {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
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

userRoute.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log('call update');
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.seller = req.body.seller || user.seller;
      console.log(req.body.seller);
      console.log(req.body);
      if (req.body.newPassword) {
        user.password = bcrypt.hashSync(req.body.newPassword, 8);
        console.log('pass updated');
      }
      const updatedUser = await user.save();
      console.log(updatedUser);
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User not Found!!!' });
    }
  })
);

export default userRoute;
