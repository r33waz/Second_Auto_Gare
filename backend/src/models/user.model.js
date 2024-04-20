import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phonenumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user", "dealer"],
    },
    verified: { type: Boolean, default: false },
    photo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    ],
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Renting",
      },
    ],
    verifytoken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
