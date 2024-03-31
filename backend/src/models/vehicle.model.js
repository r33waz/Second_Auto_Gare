import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true },
    fule_type: { type: String, required: true },
    displacement: { type: Number, required: true },
    mileage: { type: Number, required: true },
    transmission: { type: String, required: true },
    drive_type: { type: String, required: true },
    description: { type: String, required: true },
    kilometer: { type: Number, required: true },
    meta_description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    imageUrl: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    doors: { type: Number, required: true },
    price: { type: Number, required: true },
    number_of_people: { type: Number, required: true },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["sell", "rent"],
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ], 
    avilable: {
      startdate: { type: String },
      enddate: { type: String },
      isAvilable: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
