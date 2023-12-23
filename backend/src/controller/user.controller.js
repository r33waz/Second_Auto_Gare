import User from "../models/user.model.js";
import bycrypt from "bcryptjs";

export const Signup = async (req, res) => {
  const saltRounds = 10;
  try {
    const { firstname, lastname, email, phonenumber, password, photo } =
      req.body;
    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail) {
      return res.status(400).json({
        status: true,
        message: "Email already exist",
      });
    } else {
      const hashpassword = await bycrypt.hash(password, saltRounds);
      const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashpassword,
        phonenumber: phonenumber,
      });
      await newUser.save();
      return res.status(200).json({
        status: false,
        data: {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          phonenumber: newUser.phonenumber,
        },
        message: "User created sucessfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
