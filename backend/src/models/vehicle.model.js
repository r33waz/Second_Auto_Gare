import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  year: { type: Number, required: true },
  fuel_type: { type: String, required: true },
  displacement: { type: String, required: true },
  mileage: { type: Number, required: true },
  transmission: { type: String, required: true },
  imageUrl: [{ type: String }],
  doors: { type: Number, required: true },
  price: { type: Number, required: true },
  number_of_people: { type: String, required: true },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["sell", "rent"],
  }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
