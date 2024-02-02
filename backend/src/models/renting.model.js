import mongoose from "mongoose";
const rentingSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    vehicle: { type: mongoose.Types.ObjectId, ref: 'Vehicle' },
    startDate: {type:String},
    endDate: {type:String},
})
const Renting = mongoose.model("Renting", rentingSchema)
export default Renting