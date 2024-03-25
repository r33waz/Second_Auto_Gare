import Renting from "../models/renting.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import moment from "moment"
export const createBooking = async (req, res) => {
  try {
    // get data from body
    const { user, vehicle, startDate, endDate } = req.body;
    console.log(user, vehicle, startDate, endDate);
    // validate the data
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User field is missing",
      });
    }

    if (!vehicle) {
      return res.status(400).json({
        status: false,
        message: "Vehicle field is missing",
      });
    }

    if (!startDate) {
      return res.status(400).json({
        status: false,
        message: "Start Date field is missing",
      });
    }

    if (!endDate) {
      return res.status(400).json({
        status: false,
        message: "End Date field is missing",
      });
    }
    // check if the user exists in database
    const existingUser = await User.findOne({ _id: user });
    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "Invalid User ID",
      });
    }
    if (!existingUser?.verified) {
      return res.status(400).json({
        status: false,
        message: "Verify your account",
      });
    }

    const existingBookings = await Renting.find({
      vehicle: vehicle,
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
      ],
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Vehicle is already booked ",
      });
    }
    // check if the vehicle exists in database
    const existingVehicle = await Vehicle.findById(vehicle);
    if (!existingVehicle) {
      return res.status(400).json({
        status: false,
        message: "Vehicle does not exist.",
      });
    }

    await Vehicle.findByIdAndUpdate(
      { _id: vehicle },
      {
        $set: {
          avilable: {
            startdate: startDate,
            enddate: endDate,
            isAvilable: true,
          },
        },
      }
    );
    let booking = new Renting({
      user: user,
      vehicle: vehicle,
      startDate: startDate,
      endDate: endDate,
    });
    existingUser.booking.push(booking?._id);
    await booking.save();
    return res.status(200).json({
      status: true,
      data: booking,
      message: `Booking successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
// when the vehicle booking completed then the avilable booking startData and endDate should be present days
export const updateRentalToCompleted = async (req, res) => {
  const { vehicleId, userid } = req.body;
  console.log(userid);
  try {
    const user = await User.findOne({ _id: userid });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid user.",
      });
    }
    const singleVehicle = await Vehicle.findOne({ _id: vehicleId });
    console.log(singleVehicle);
    await Vehicle.findByIdAndUpdate(
      { _id: vehicleId },
      {
        $set: {
          avilable: {
            startdate: moment().format("l"),
            enddate: moment().format("l"),
            isAvilable: false,
          },
        },
      }
    );
    user.booking.pull(vehicleId);
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Booking completed",
    });
    // }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
// get all rentings vehicle
export const getAllRentingsVehicle = async (req, res) => {
  try {
    const bookedvehicle = await Renting.find()
      .populate("user", "_id firstname lastname email phonenumber")
      .populate("vehicle", "_id model brand color imageUrl number_of_people")
      .sort("startDate");
    if (bookedvehicle.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No Booking Found",
      });
    } else {
      return res.status(200).json({
        status: true,
        count: bookedvehicle.length,
        data: bookedvehicle,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
//get one rental by id
export const getRentingsVehicleById = async (req, res) => {
  const id = req.params.id;
  try {
    const bookedvehicle = await Renting.findById({ _id: id })
      .populate("user", "_id firstname lastname email phonenumber")
      .populate("vehicle", "_id model brand color imageUrl number_of_people")
      .sort("startDate");
    return res.status(200).json({
      status: true,
      data: bookedvehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
//delete renting  by id
export const deleteRentingsVehicle = async (req, res) => {
  const id = req.params.id;
  try {
    const deletevehicle = await Renting.findById({ _id: id }).populate(
      "vehicle",
      "_id model brand color imageUrl number_of_people"
    );
    return res.status(200).json({
      status: true,
      data: deletevehicle,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const filterByDates = async (req, res) => {
  // Get the start and end date from query params
  const { startDate, endDate } = req.query;

  // Validate the startDate and endDate query parameters
  if (!startDate || !endDate) {
    return res.status(400).json({
      status: false,
      message: "startDate and endDate are required",
    });
  }

  try {
    // Converting the startDate and endDate strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const existingBookings = await Renting.find({
      $or: [
        { startDate: { $gte: startDateObj, $lte: endDateObj } },
        { endDate: { $gte: startDateObj, $lte: endDateObj } },
        {
          $and: [
            { startDate: { $lte: startDateObj } },
            { endDate: { $gte: endDateObj } },
          ],
        },
      ],
    }).populate("user", "_id firstname lastname email phonenumber");

    if (existingBookings.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No bookings in this date range",
      });
    } else {
      return res.status(200).json({
        status: true,
        count: existingBookings.length,
        data: existingBookings,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//find booking according the paticularr user
export const findBookingByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookings = await Renting.find({ user: userId }).populate({
      path: "vehicle",
      select: "_id model brand color imageUrl number_of_people",
    });
    if (bookings.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No bookings found for this user",
      });
    }
    return res.status(200).json({
      status: true,
      bookings: bookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
