import Renting from "../models/renting.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
export const UserCategory = async (req, res) => {
  try {
    const user = await User.find();
    const normalUser = user.filter((u) => u.role === "user");
    const dealer = user.filter((u) => u.role === "dealer");
    return res.status(200).json({
      status: true,
      data: [
        { name: "Normal Users", value: normalUser.length },
        { name: "Dealers", value: dealer.length },
      ],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal  Server Error",
    });
  }
};

export const VehicleCategory = async (req, res) => {
  try {
    const vehicle = await Vehicle.find();
    const suv = vehicle.filter((v) => v?.category === "suv");
    const sedan = vehicle.filter((v) => v?.category === "sedan");
    const hatchback = vehicle.filter((v) => v?.category === "hatchback");
    const van = vehicle.filter((v) => v?.category === "van");
    const hybrid = vehicle.filter((v) => v?.category === "hybrid");
    const truck = vehicle.filter((v) => v?.category === "truck");
    const electric = vehicle.filter((v) => v?.category == "electric");
    return res.status(200).json({
      status: true,
      data: [
        { name: "SUV", value: suv.length },
        { name: "Sedan", value: sedan.length },
        { name: "Hatchback", value: hatchback.length },
        { name: "Van", value: van.length },
        { name: "Hybrid", value: hybrid.length },
        { name: "Truck", value: truck.length },
        { name: "Electric", value: electric.length },
      ],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal  Server Error",
    });
  }
};

export const VehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.find();
    const sell = vehicle.filter((v) => v?.status === "sell");
    const rent = vehicle.filter((v) => v?.status === "rent");

    return res.status(200).json({
      status: true,
      data: [
        { name: "Sell", value: sell.length },
        { name: "Rent", value: rent.length },
      ],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal  Server Error",
    });
  }
};

export const RentingByDate = async (req, res) => {
  try {
    // Aggregate bookings by date
    const bookingByDate = await Renting.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date in ascending order
    ]);

    // Format the data for line graph
    const dataForLineGraph = bookingByDate.map((entry) => ({
      date: entry._id, // Date
      count: entry.count, // Number of bookings
    }));

    return res.status(200).json({
      status: true,
      data: dataForLineGraph,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
