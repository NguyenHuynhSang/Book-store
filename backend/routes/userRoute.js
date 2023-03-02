import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';
const userRoute = express.Router();

userRoute.post(
  '/login',

  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
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
export default userRoute;
