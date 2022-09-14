import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
      unique: true,
      auto: true,
    },
    name: {
      type: String,
      required: [true, "Campo requerido"],
    },
    description: {
      type: String,
      required: [false, "Campo requerido"]
    },
    price: {
      type: Number,
      required: [false, "Campo requerido"]
    },
    image: {
      type: String,
      required: [false, "Campo requerido"]
    }
  },
);

const Product = mongoose.model("Product", schema);

export default Product