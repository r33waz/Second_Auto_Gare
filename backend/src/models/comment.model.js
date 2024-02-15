import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    text: {
        type: String,

        required: true
    },

}, {
    timestamps: true
});
const Comment = mongoose.model("Comment", CommentSchema);
export default Comment