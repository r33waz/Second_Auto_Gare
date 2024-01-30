import { check } from "express-validator";

// Middleware function for OTP verification
const otpVerification = [
    check("email", "Enter a valid email").isEmail().normalizeEmail({
        gmail_remove_dots: true
    })
];

// Middleware function for validating userId and token during OTP verification
const verifyOtpValidation = [
    check("userId", "User ID is required").not().isEmpty(),
    check("token", "Token is required").not().isEmpty()
];
export { otpVerification, verifyOtpValidation };
