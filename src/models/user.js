import mongoose from "mongoose";
import validator from 'validator'

const Schema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
      unique: true,
      auto: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Email inválido"],
      required: true, 
      unique: true,
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true, 
    },
    phone: {
      type: Number,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
    }
  },
);

const User = mongoose.model("User", Schema);
export default User




