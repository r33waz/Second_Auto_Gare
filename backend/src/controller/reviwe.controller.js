import Review from "../models/review.model.js";


export const createReview = async (req, res) => {
    try {
        const { fullname, email, phonenumber, message } = req.body
        if (!fullname) {
            return res.status(400).json({ status: false, message: 'Please provide fullname' })
        }
        if (!email) {
            return res.status(400).json({ status: false, message: 'Please provide email' })
        }
        if (!phonenumber) {
            return res.status(400).json({ status: false, message: 'Please provide phonenumber' })
        }
        if (!message) {
            return res.status(400).json({ status: false, message: 'Please provide message' })
        }
        // Checking the length of the inputs
        if (message.length > 250) {  
            return res.status(400).json({
                message: "Messsage should be 200  characters or less"
            })
        }
        if (phonenumber.length > 10) {
            return res.status(400).json({
                message: "Phone number must be 10 digits only"
            })
        }
        let review = new Review({ fullname, email, phonenumber, message });
        await review.save()
        return res.status(201).json({
            status: true,
            message: "Thankyou for feedback"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}
// Get all feedback
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        if (!reviews) {
            return res.status(400).json({
                message: "No Reviews Found!"
            })
        }
        return res.status(200).json({
            count: reviews.length,
            data: reviews
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}
// filetr vehicles according to the dates ehat are avilable for booking
export const filterVehiclesByDates = async (req, res) => {
    
    try {
        
    } catch (error) {
        
    }
}
//delete the reviwe
export const deleteReview = async (req, res) => {
    const id = req.params.id
    try {
        const review = await Review.findById({ _id: id });
        if (!review) {
            return res.status(400).json({
                message: 'Review not found'
            })
        } else {
            const review = await Review.findByIdAndDelete({ _id: id })
            return res.status(200).json({
                message: `Review deleted`,
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "internal server error"
        })
    }
}
