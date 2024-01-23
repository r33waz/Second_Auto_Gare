import {check} from "express-validator"
const otpVerification = [
    check("email", "Enter a valid email").isEmail().normalizeEmail({
        gmail_remove_dots: true
    })
]

export default otpVerification;