import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Requerido"],
    },
    type: {
      type: String,
      required: [true, "Requerido"],
    },
    message: {
      type: String,
      required: [true, "Requerido"],
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", Schema);
export default Message;