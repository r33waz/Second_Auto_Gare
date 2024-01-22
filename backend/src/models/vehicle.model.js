import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  year: { type: Number, required: true },
  fule_type: { type: String, required: true },
  transmission: { type: String, required: true },
  imageUrl: [{ type: String }],
  doors: { type: Number, required: true },
  price: { type: Number, required: true },
  number_of_people: { type: String, require: true },
});
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
