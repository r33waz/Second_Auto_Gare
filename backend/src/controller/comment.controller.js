import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";

export const CreateComment = async (req, res) => {
  try {
    const { author, post, text } = req.body;
    if (!text) {
      return res.status(400).json({
        status: false,
        message: 'Text field is required'
      });
    }
    // Find the post
    const postDoc = await Vehicle.findById(post);
    if (!postDoc) {
      return res.status(404).json({
        status: false,
        message: 'Post not found'
      });
    }
    // Create a new comment
    const newComment = new Comment({
      author,
      post,
      text
    });
    // Save the comment
    const savedComment = await newComment.save();
    // Add the comment to the post's comments array
    postDoc.comments.push(savedComment._id);
    await postDoc.save();
    return res.status(201).json({
      status: true,
      message: 'Comment created successfully',
      data: savedComment
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
}
//delete the comment 

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId; 
    const vehicleId = req.params.vehicleId; 
    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    // Check if the comment is associated with the vehicle
    if (comment.post.toString() !== vehicleId) {
      return res.status(403).json({ message: "Comment is not associated with this vehicle" });
    }
    // Update the vehicle's comment array (if necessary)
    await Vehicle.findByIdAndUpdate(vehicleId, {
      $pull: { comments: commentId }
    });
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};