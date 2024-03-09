import mongoose, { mongo } from 'mongoose';
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, require: true },
        slug: { type: String, require: true, unique: true },
        image: { type: String, default: '/imgs/n2.webp' },
        price: { type: Number, require: true },
        rating: { type: Number, default: 0 },
        price: { type: Number, require: true },
        quantity: { type: Number, require: true, default: 0 },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, require: true },
      address: { type: String, require: true },
      phone: { type: String, require: true },
    },
    paymentMethod: { type: String, require: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId },
    isPaid: { type: Boolean, default: false },

    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
