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
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      seller: req.body.orderItems[0].seller,
    });
    newOrder.deliverInfor = 'waiting';
    console.log('Start');
    console.log(newOrder);
    const order = await newOrder.save();
    console.log('Saved');
    console.log('saved order:' + order);

    res.status(201).send({ message: 'Order created', order });
    console.log('created');
  })
);

orderRoute.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('call order api');
    const order = await Order.findById(req.params.id);

    if (order) {
      order.deliverInfor = req.body.delivery || order.deliverInfor;
      order.shippingAddress.fullName =
        req.body.shipName || order.shippingAddress.fullName;
      order.shippingAddress.address =
        req.body.address || order.shippingAddress.address;
      order.shippingAddress.phone =
        req.body.phone || order.shippingAddress.phone;
      if (order.deliverInfor === 'delivered') {
        order.deliveredAt = new Date();
      }
    }
    const updatedOrder = await order.save();
    console.log(updatedOrder);
    res.send(updatedOrder);
  })
);

orderRoute.get(
  '/orderHistory',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('user id:' + req.user._id);
    const orders = await Order.find({ user: req.user._id });
    console.log('orders:' + orders);
    res.send(orders);
  })
);

orderRoute.get(
  '/orderManager',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('user id:' + req.user._id);
    const orders = await Order.find({ seller: req.user._id });
    console.log('orders:' + orders);
    res.send(orders);
  })
);

orderRoute.get('/:id', async (req, res) => {
  console.log('id:' + req.params.id);
  const order = await Order.findOne({ _id: req.params.id });

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order Not found' });
  }
});
export default orderRoute;
