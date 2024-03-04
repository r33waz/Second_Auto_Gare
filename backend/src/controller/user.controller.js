import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { validationResult } from "express-validator";
import { OTPexpire, TwominOTPexpire } from "../utils/otpvalidation.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const Signup = async (req, res) => {
  const saltRounds = 10;
  console.log(req.body);
  try {
    const { firstname, lastname, email, phonenumber, password, category } =
      req.body;
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
    });
    await newUser.save();
    return res.status(200).json({
      status: true,
      message: "User signup sucessfully",
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

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid Email or Password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        status: false,
        message: "Invalid Email or Password",
      });
    }
    const token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      })
      .status(200)
      .json({
        status: true,
        data: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          islogin: true,
          verified: user.verified,
          photo: user.photo,
        },
        message: "Logged in successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//*API for user logout deleting session id
export const Logout = async (req, res) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ status: true, message: "Successfully logged out" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//*API to get all user
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find().populate(
      "post",
      "model brand color year fule_type displacement mileage transmission imageUrl doors price number_of_people category status"
    );
    if (user) {
      return res.status(200).json({
        status: true,
        data: user,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No users found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
//*API to get userby id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id }).populate(
      "post",
      "model brand color year fule_type displacement mileage transmission imageUrl doors price number_of_people category status"
    );
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "No user found",
      });
    } else {
      return res.status(200).json({
        status: true,
        data: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          islogin: true,
          verified: user.verified,
          photo: user.photo,
          phonenumber: user.phonenumber,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//*API for user update

export const userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid Attempt",
      });
    } else {
      if (!req.files) {
        // Updating without image
        const updatedUser = await User.findByIdAndUpdate(
          { _id: id },
          { ...req.body }
        );
      }

      // Update the image in cloudinary
      let results = [];
      for (let file of req.files) {
        let result;
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg"
        ) {
          result = await cloudinary.v2.uploader.upload(file.path);
        }
        results.push({ public_id: result.public_id, url: result.secure_url });
        fs.unlinkSync(file.path);
      }

      if (user?.photo) {
        // Deleting old images from cloudinary
        for (let photo of user.photo) {
          await cloudinary.v2.uploader.destroy(photo?.public_id);
        }
      }

      // Check if password needs to be updated
      if (req.body.password) {
        // Hash the password before updating
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
      }

      const updateUser = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { ...req.body, photo: results } },
        { new: true }
      );

      if (!updateUser) {
        return res.status(400).json({
          status: false,
          message: "Invalid Attempt",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: `${
            updateUser?.firstname + " " + updateUser?.lastname
          } updated`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//*API for user update
export const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not Found!",
      });
    } else {
      const user = await User.findByIdAndDelete({ _id: id });
      if (user) {
        return res.status(200).json({
          status: true,
          message: `${user.firstname + " " + user.lastname} deleted`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//* Api for user search by email
export const userSearchByEmail = async (req, res) => {
  const user = req.query.email || "";
  const query = { email: { $regex: user, $options: "i" } };
  console.log(query);
  try {
    const emailUser = await User.find(query);
    if (emailUser.length === 0) {
      return res.status(404).json({
        status: false,
        message: `No users found`,
      });
    } else {
      return res.status(200).json({
        status: true,
        data: emailUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//*API to send otp
export const SendOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: "Enter a valid email",
        errors: errors.array(),
      });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Email not registered",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        status: false,
        message: "This account is already verified.",
      });
    }
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 999999);
    };
    const OTP = generateOTP();

    const prevOTP = await Token.findOne({ userId: user._id });
    if (prevOTP) {
      const sendAnotherOtp = await OTPexpire(prevOTP.createdAt);
      if (!sendAnotherOtp) {
        return res.status(400).json({
          status: false,
          message: "Try againg after some minutes!",
        });
      }
    }
    await Token.findOneAndUpdate(
      { userId: user._id },
      { token: OTP, createdAT: Date.now() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(OTP);

    const message = `<p>Hi ${user.firstname} ${user.lastname},</p>
<p>Your OTP is:<h3> <b>${OTP}</b></h3></p>
<p>Please use the above OTP to verify your account.</p>`;
    sendEmail(user.email, "OTP Verification", message);
    return res.status(200).json({
      status: true,
      message: `An OTP has been sent to your email.`,
    });
  } catch (error) {
    console.error("Error sending OTP:", error); // Log the error for debugging
    return res.status(500).json({
      status: false,
      message: "An error occurred while sending OTP. Please try again later.",
    });
  }
};

// @route   POST api/auth/verifyotp
export const VerifyOtp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: "Input fields are empty",
        errors: errors.array(),
      });
    }

    const { userId, token } = req.body;
    console.log(userId, token);
    const otpData = await Token.findOne({ userId, token });
    //*Checking if the otp exist or not
    if (!otpData) {
      return res.status(401).json({
        status: false,
        message: "Invalid or expired OTP",
      });
    }
    //*checking the time of the otp
    const isExpired = await TwominOTPexpire(otpData.createdAt);
    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "OTP already expired!",
      });
    }
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: { verified: true },
      }
    );
    return res.status(200).json({
      status: true,
      message: "OTP verified successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
