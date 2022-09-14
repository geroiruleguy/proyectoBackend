import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      auto: true
    },
    email: {
      type: String,
      required: [true, "Requerido"],
    },
    status: {
      type: String,
      required: [true, "Requerido"],
    },
    address: {
      type: String,
    },
    productItems: [
      {
        productName: {
          type: String,
          required: [true],
        },
        description: {
          type: String,
          required: [true],
        },
        price: {
          type: Number,
          required: [true],
        },
        qty: {
          type: Number,
          required: [true],
        },
      },
    ],
  },
);

const Order = mongoose.model("Order", Schema);
export default Order;