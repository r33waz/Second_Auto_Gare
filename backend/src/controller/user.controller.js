import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

export const Signup = async (req, res) => {
  const saltRounds = 10;
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file found",
      });
    }
    const { firstname, lastname, email, phonenumber, password, category } =
      req.body;
    let userPhoto;
    if (
      req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/jpg" ||
      req.file.mimetype === "image/png"
    ) {
      userPhoto = await cloudinary.v2.uploader.upload(req.file.path);
    } else {
      res.status(400).json({
        status: false,
        message: "Invalid file type",
      });
    }
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }
    
    const hashpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashpassword,
      phonenumber,
      role: category,
      photo: userPhoto.secure_url,
    });

    const savedUser = await newUser.save();
    return res.status(200).json({
      status: true,
      data: {
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        email: savedUser.email,
        phonenumber: savedUser.phonenumber,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
//*API to Login user ussing session
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid Email or Password",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword || !user) {
      return res.status(400).json({
        status: false,
        message: "Invalid Email or Password",
      });
    } else {
      req.session.user = {
        _id: user.id,
        role: user.role,
      };

      return res.status(200).json({
        status: true,
        /*Here we are using spread operator to copy all the data from the req.session.user and adding phonenumber property into it*/
        data: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          islogin: true,
          photo: user.photo,
        },
        message: `Welcome ${user.firstname + " " + user.lastname}!`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//*API for user logout deleting session id
export const Logoout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal server error",
        });
      }
    });

    res.clearCookie("connect.sid");
    return res.status(200).json({
      status: true,
      message: "Logout sucessfull",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//*API for user update
export const userUpdate = async (req, res) => {
  try {
    console.log("user");
  } catch (error) {}
};

//*API for user update
export const userDelete = async (req, res) => {
  try {
  } catch (error) {}
};
