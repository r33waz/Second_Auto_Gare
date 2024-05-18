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
  console.log(req.body);
  try {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      confirmnewpassword,
      role,
    } = req.body;
    // Check for existing user with the same username
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }
    const hashpassword = await bcrypt.hash(confirmnewpassword, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashpassword,
      phonenumber,
      role,
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
    console.log(email, password);
    const user = await User.findOne({ email });
    console.log("user", user);
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
      process.env.SECRET_KEY,
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
      "model brand color drive_type year fule_type kilometer displacement mileage transmission imageUrl doors price number_of_people category status"
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
    const user = await User.findById({ _id: id })
      // .select("-password")
      .populate(
        "post",
        "model brand color year fule_type displacement mileage transmission imageUrl doors price number_of_people category status"
      )
      .select("-password");

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "No user found",
      });
    } else {
      return res.status(200).json({
        status: true,
        data: user,
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
  console.log(req.body);
  console.log(req.file);
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid Attempt",
      });
    } else {
      console.log("body", req.body);
      console.log("file", req.file);

      // Check if the old password matches the current password
      if (req.body.oldPassword) {
        const isPasswordMatch = await bcrypt.compare(
          req.body.oldPassword,
          user.password
        );
        if (!isPasswordMatch) {
          return res.status(400).json({
            status: false,
            message: "Old password does not match",
          });
        }
      }

      // Check if password needs to be updated and hash it
      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
      }

      if (!req.file) {
        // Updating user without image
        const updateUser = await User.findByIdAndUpdate(
          { _id: id },
          { ...req.body, photo: user.photo } // Use the existing photo if no new photo is uploaded
        );

        if (!updateUser) {
          return res.status(400).json({
            status: false,
            message: "Invalid Attempt",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: `${updateUser.firstname} ${updateUser.lastname} updated`,
          });
        }
      } else {
        // Update user with image
        let postPhoto;
        postPhoto = await cloudinary.v2.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path); // Remove the uploaded file from the server

        // Deleting old images from cloudinary if they exist
        if (user?.photo && user?.photo?.public_id) {
          const public_id = user?.photo?.public_id;
          await cloudinary.v2.uploader.destroy(public_id);
        }

        // Update the user information
        const updateUser = await User.findByIdAndUpdate(
          { _id: id },
          { $set: { ...req.body, photo: postPhoto || user.photo } }, // Use the new photo if uploaded, otherwise keep the old one
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
            message: `${updateUser.firstname} ${updateUser.lastname} updated`,
          });
        }
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

export const forgetPassoword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Email doesnot  exist.",
      });
    }
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "300s",
      });
      const setusertoken = await User.findByIdAndUpdate(
        { _id: user._id },
        { verifytoken: token },
        { new: true }
      );
      if (setusertoken) {
        const URL = `${process.env.BASE_URL}/ressetPassword/${user?._id}/${token}`;
        const message = `<p>Dear ${user.firstname} ${user.lastname},</p><br>
<p>We have received a request to reset your password for your Money Mitra account.<br> If you did not request a password reset, please ignore this email.</p>
<p>To reset your password, please click the link below:</p>
<p >Note :<span style="color: red ;">that link expires in 5 minutes</span></p>
<a href="${URL}">Reset Password</a>`;
        sendEmail(user.email, "Reset password", message);
        return res.status(200).json({
          status: true,
          message: `An link has been sent to your email.`,
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

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(id, token);
  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("token", verifyToken);
    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, message: "Valid Token" });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "Token expired" });
  }
};

export const setPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(password);
  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 10);

      const setnewuserpass = await User.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );

      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
