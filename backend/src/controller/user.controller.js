import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import Token from "../models/token.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { validationResult } from "express-validator";
import { OTPexpire, TwominOTPexpire } from "../utils/otpvalidation.js";

export const Signup = async (req, res) => {
  const saltRounds = 10;
  try {
    const { firstname, lastname, email, phonenumber, password, category } =
      req.body;

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
    });
    let result = await newUser.save();
    return res.status(200).json({
      status: true,
      message: "User signup sucessfully"
    })
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

    req.session.user = {
      _id: user.id,
      role: user.role,
    };

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
      },
      message: `Welcome ${user.firstname + " " + user.lastname}!`,
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

//*API to get all user
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
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
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "No user found",
      });
    } else {
      return res.status(200).json({
        status: true,
        data: user,
        message: `${user?.firstname + "" + user?.lastname}`,
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
    console.log(user);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid Attemp",
      });
    } else {
      const updateUser = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true } //return updated document instead of original one
      );

      if (!updateUser) {
        return res.status(400).json({
          status: false,
          message: "Invalid Attemp",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: `${updateUser?.firstname + " " + updateUser?.lastname
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
  // console.log(req.query)
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
        data: emailUser
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
        message: 'Enter a valid email',
        errors: errors.array()
      });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Email not registered'
      });
    }

    if (user.verified) {
      return res.status(400).json({
        status: false,
        message: 'This account is already verified.'
      });
    }
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 999999);
    }
    const OTP = generateOTP();

    const prevOTP = await Token.findOne({ userId: user._id })
    if (prevOTP) {
      const sendAnotherOtp = await OTPexpire(prevOTP.createdAt)
      if (!sendAnotherOtp) {
        return res.status(400).json({
          status: false,
          message: "Try againg after some minutes!"
        })
      }
    }
    await Token.findOneAndUpdate(
      { userId: user._id },
      { token: OTP, createdAT: Date.now() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    console.log(OTP)


    const message = `<p>Hi ${user.firstname} ${user.lastname},</p>
<p>Your OTP is:<h3> <b>${OTP}</b></h3></p>
<p>Please use the above OTP to verify your account.</p>`;
    sendEmail(user.email, "OTP Verification", message);
    return res.status(200).json({
      status: true,
      message: `An OTP has been sent to your email.`
    });

  } catch (error) {
    console.error('Error sending OTP:', error); // Log the error for debugging
    return res.status(500).json({
      status: false,
      message: 'An error occurred while sending OTP. Please try again later.'
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
        message: 'Input fields are empty',
        errors: errors.array()
      });
    }

    const { userId, token } = req.body
    console.log(userId, token)
    const otpData = await Token.findOne({ userId, token })
    //*Checking if the otp exist or not
    if (!otpData) {
      return res.status(401).json({
        status: false,
        message: 'Invalid or expired OTP'
      })
    }
    //*checking the time of the otp
    const isExpired = await TwominOTPexpire(otpData.createdAt)
    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "OTP already expired!"
      })
    }
    await User.findByIdAndUpdate({ _id: userId }, {
      $set: { verified: true }
    })
    return res.status(200).json({
      status: true,
      message: 'OTP verified successfully!'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: "Internal Server Error"
    })
  }
}