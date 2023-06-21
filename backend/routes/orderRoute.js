import express from 'express';

import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRoute = express.Router();

orderRoute.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('call api order');
    console.log(req.body);
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, book: x._id })),
      itemsPrice: req.body.itemsPrice,
      shippingAddress: req.body.shippingAddress,
      user: req.user._id,
      paymentMethod: req.body.paymentMethod,
      shippingPrice: req.body.shippingPrice,
      taxPrice: 10,
      totalPrice: req.body.totalPrice,
    });

    console.log('userId' + req.user._id);
    console.log('Start');
    console.log(newOrder);
    console.log(newOrder.orderItems);
    const order = await newOrder.save();
    console.log('Saved');
    res.status(201).send({ message: 'Order created', order });
  })
);
export default orderRoute;
