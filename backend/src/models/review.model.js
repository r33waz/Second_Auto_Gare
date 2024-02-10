import mongoose from "mongoose";

const reviewSchems = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Review = mongoose.model("Review", reviewSchems);
export default Review;