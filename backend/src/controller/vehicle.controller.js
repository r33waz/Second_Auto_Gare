import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import fs from "fs";

export const Addvehicle = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "No file found",
      });
    }

    const {
      user,
      model,
      brand,
      year,
      color,
      displacement,
      mileage,
      fule_type,
      kilometer,
      drivetype,
      transmission,
      doors,
      price,
      number_of_people,
      category,
      status,
    } = req.body;
    const userObj = await User.findById(user);
    let results = [];
    for (let file of req.files) {
      let result;
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
      ) {
        result = await cloudinary.v2.uploader.upload(file.path);
      }
      results.push({ public_id: result.public_id, url: result.secure_url });
      fs.unlinkSync(file.path); //delete the temporary uploaded file
    }
    if (!model) {
      return res.status(400).json({
        status: false,
        message: "Model is required",
      });
    }
    if (!brand) {
      return res.status(400).json({
        status: false,
        message: "Brand is required",
      });
    }
    if (!color) {
      return res.status(400).json({
        status: false,
        message: "Color is required",
      });
    }
    if (!year) {
      return res.status(400).json({
        status: false,
        message: "Year is required",
      });
    }
    if (!displacement) {
      return res.status(400).json({
        status: false,
        message: `Displacement is required`,
      });
    }
    if (!fule_type) {
      return res.status(400).json({
        status: false,
        message: "Fuel type is required",
      });
    }
    if (!kilometer) {
      return res.status(400).json({
        status: false,
        message: "Kilometers is required",
      });
    }
    if (!drivetype) {
      return res.status(400).json({
        status: false,
        message: "Drive Type is required",
      });
    }
    if (!transmission) {
      return res.status(400).json({
        status: false,
        message: "Transmission is required",
      });
    }
    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Istatus is required",
      });
    }
    if (!doors) {
      return res.status(400).json({
        status: false,
        message: "Number of doors is required",
      });
    }
    if (!price) {
      return res.status(400).json({
        status: false,
        message: "Price is required",
      });
    }
    if (!number_of_people) {
      return res.status(400).json({
        status: false,
        message: "Number of people is required",
      });
    }
    if (!category) {
      return res.status(400).json({
        status: false,
        message: "Select your category",
      });
    }

    const newvehicle = new Vehicle({
      user,
      model,
      brand,
      year,
      color,
      displacement,
      mileage,
      fule_type,
      kilometer,
      drivetype,
      transmission,
      imageUrl: results,
      doors,
      price,
      number_of_people,
      category,
      status,
    });
    userObj.post.push(newvehicle._id);
    await userObj.save();
    // Save vehicle to database
    await newvehicle.save();
    return res.status(200).json({
      status: true,
      data: newvehicle,
      message: "Vehicle has been added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Get all vehicles from the database
export const getAllVehicle = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "author",
          select: "_id firstname lastname",
        },
      })
      .sort([["createdAt", -1]]);
    // .populate({
    //     path: 'comments',
    //     model: "Comment",
    //     populate: {
    //         path: 'post',
    //         select: '_id model brand color imageUrl number_of_people'
    //     }
    // })
    if (!vehicles) {
      return res.status(400).json({
        status: false,
        message: "No vehicles found in the database",
      });
    } else {
      return res.status(200).json({
        status: true,
        count: vehicles.length,
        data: vehicles,
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
// Get a vehicle by its id
export const getVehicleById = async (req, res) => {
  try {
    const id = req.params.id;
    const singleVehicle = await Vehicle.findById({ _id: id })
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "author",
          select: "_id firstname lastname photo",
        },
      })
      .populate("user", "_id firstname lastname email phonenumber photo");
    if (!singleVehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle doesnot exist",
      });
    } else {
      return res.status(200).json({
        status: true,
        data: singleVehicle,
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

//Delete vehicle by id
export const deleteVechile = async (req, res) => {
  try {
    const id = req.params.id;
    const singleVehicle = await Vehicle.findById({ _id: id }).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "_id firstname lastname",
      },
    });
    if (!singleVehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found!",
      });
    } else {
      const deletevehicle = await Vehicle.findByIdAndDelete({ _id: id });
      return res.status(200).json({
        status: true,
        data: deletevehicle,
        message: "Deleted Successfully",
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

//Update vehicle by finding the vehicle id
export const updateVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    const vehicle = await Vehicle.findById({ _id: id });
    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle Not Found!",
      });
    } else {
      if (!req.files) {
        //updating without image
        const updatevehicle = await Vehicle.findByIdAndUpdate(
          { _id: id },
          { ...req.body }
        );
      }
      let results = [];
      //for of loop
      for (let file of req.files) {
        let result;
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg"
        ) {
          result = await cloudinary.v2.uploader.upload(file.path);
        }
        results.push({ public_id: result.public_id, url: result.secure_url });
        fs.unlinkSync(file.path);
      }

      if (vehicle?.imageUrl) {
        //deleting old images from cloudinary
        for (let photo of vehicle.imageUrl) {
          await cloudinary.v2.uploader.destroy(photo?.public_id);
        }
      }

      const updatevehicle = await Vehicle.findByIdAndUpdate(
        { _id: id },
        { $set: { ...req.body, imageUrl: results } },
        { new: true }
      );
      return res.status(200).json({
        status: true,
        data: updatevehicle,
        message: "Vehicle updated successfully.",
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

//search vehicle according to model
export const searchByModel = async (req, res) => {
  const vehiclebrand = req.query.brand || "";
  const query = { brand: { $regex: vehiclebrand, $options: "i" } };
  try {
    const singleVehicle = await Vehicle.find(query).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "_id firstname lastname",
      },
    });
    if (singleVehicle.length === 0) {
      return res.status(400).json({
        status: false,
        message: `No vehicles found with the model ${vehiclebrand}`,
      });
    } else {
      return res.status(200).json({
        status: true,
        count: singleVehicle.length,
        data: singleVehicle,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
//get vehicle accordeng tha schema
export const searchVehicle = async (req, res) => {
  let {
    model,
    brand,
    color,
    year,
    fule_type,
    displacement,
    min,
    max,
    transmission,
    category,
    doors,
    status,
  } = req.query;
  try {
    const query = {
      model: { $regex: model, $options: "i" } || { $exists: true },
      brand: { $regex: brand, $options: "i" } || { $exists: true },
      color: { $regex: color, $options: "i" } || { $exists: true },
      year: year ? parseInt(year) : { $gte: 1900 },
      fule_type: { $regex: fule_type, $options: "i" } || { $exists: true },
      displacement: { $regex: displacement, $options: "i" } || {
        $exists: true,
      },
      transmission: { $regex: transmission, $options: "i" } || {
        $exists: true,
      },
      doors: doors ? parseInt(doors) : { $gte: 2 },
      price: { $gte: parseInt(min) || 0, $lte: parseInt(max) || Infinity },
      category: { $regex: category, $options: "i" } || { $exists: true },
      status: { $regex: status, $options: "i" } || { $exists: true },
    };
    const vehicles = await Vehicle.find(query)
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "author",
          select: "_id firstname lastname",
        },
      })
      .sort([["price", "ascending"]]);
    if (vehicles.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No matching results were found",
      });
    } else {
      const formattedVehicles = vehicles.map((vehicle) => ({
        ...vehicle._doc,
        imageUrl: vehicle.imageUrl.map((image) => image.url),
      }));
      return res.status(200).json({
        status: true,
        data: formattedVehicles,
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

//get vehicle according to max and min value
export const getPriceRange = async (req, res) => {
  let { min, max } = req.query;
  [min, max] = [parseInt(min), parseInt(max)];
  // Check for valid input
  if (!min || !max || isNaN(min) || isNaN(max)) {
    return res.status(400).json({
      status: false,
      message: "Invalid price range values provided.",
    });
  }
  try {
    const vehiclesInRange = await Vehicle.find({
      price: { $gte: min, $lte: max },
    })
      .sort([["price", "ascending"]])
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "author",
          select: "_id firstname lastname",
        },
      });
    if (vehiclesInRange.length === 0 && vehiclesInRange) {
      return res.status(400).json({
        status: false,
        message: "No cars in given price range.",
      });
    } else {
      return res.status(200).json({
        status: true,
        count: vehiclesInRange.length,
        data: vehiclesInRange,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
//get vehicle accordin to color
export const getColorVehicles = async (req, res) => {
  const vehicolor = req.query.color || "";
  const query = { color: { $regex: vehicolor, $options: "i" } };
  try {
    const singleVehicle = await Vehicle.find(query).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "_id firstname lastname",
      },
    });
    if (singleVehicle.length === 0) {
      return res.status(400).json({
        status: false,
        message: `No vehicles available in this color`,
      });
    } else {
      return res.status(200).json({
        status: true,
        data: singleVehicle,
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

//find vehicle by theri fuletype
export const getvehicleFuletype = async (req, res) => {
  const vehiclefule = req.query.fule_type || "";
  const query = { fule_type: { $regex: vehiclefule, $options: "i" } };
  try {
    const singleVehicle = await Vehicle.find(query).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "_id firstname lastname",
      },
    });
    if (singleVehicle.length === 0) {
      return res.status(400).json({
        status: false,
        message: `No vehicles available `,
      });
    } else {
      return res.status(200).json({
        status: true,
        count: singleVehicle.length,
        data: singleVehicle,
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

//find vehicle according to its displacement
export const findDisplacementVehicles = async (req, res) => {
  const vehicleDisplacement = req.query.displacement || "";
  console.log(vehicleDisplacement);
  const query = {
    displacement: { $regex: vehicleDisplacement, $options: "i" },
  };
  console.log(query);
  try {
    const singleVehicle = await Vehicle.find(query).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "_id firstname lastname",
      },
    });
    if (!singleVehicle.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No vehicle found",
      });
    } else {
      return res.status(200).json({
        status: true,
        data: singleVehicle,
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
// find vehicle by transmission
export const findTransmissionVehicles = async (req, res) => {
  const vehicleTransmission = req.query.transmission || "";
  const query = {
    transmission: { $regex: vehicleTransmission, $options: "i" },
  };
  console.log(query);
  try {
    const singleVehicle = await Vehicle.find(query).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "_id firstname lastname",
      },
    });
    if (singleVehicle.length === 0) {
      return res.status(400).json({
        status: false,
        message: `No ${vehicleTransmission} vehicle is available`,
      });
    } else {
      return res.status(200).json({
        status: true,
        data: singleVehicle,
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
//find by category
export const findByCategory = async (req, res) => {
  let { category } = req.query;

  console.log("category :", category);
  let query = { category: { $regex: category, $options: "i" } };
  console.log(query);
  try {
    const singleVehicle = await Vehicle.find(query)
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "author",
          select: "_id firstname lastname photo",
        },
      })
      .sort([["createdAt", -1]]);
    if (singleVehicle.length === 0) {
      return res.status(400).json({
        status: false,
        // message: "No vehicles found",
      });
    } else {
      return res.status(200).json({
        stauts: true,
        data: singleVehicle,
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

//filter vehicle by status
export const vehicleByStatus = async (req, res) => {
  try {
    let statuses = req.query.status || "";
    //console.log("Categories", categories);
    // Construct query to match categories for selling or renting
    const query = { status: { $in: ["sell", "rent"] } };
    if (statuses) {
      // If categories are provided, filter by those categories
      query.status = { $in: statuses.split(",") };
    }
    // Find vehicles matching the query
    const singleVehicle = await Vehicle.find(query).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "_id firstname lastname",
      },
    });
    // Check if vehicles are found for selling or renting
    if (singleVehicle.length === 0) {
      if (query.status.$in.includes("sell")) {
        return res.status(403).json({
          status: false,
          message: "No vehicles available for selling",
        });
      } else if (query.status.$in.includes("rent")) {
        return res.status(400).json({
          status: false,
          message: "No vehicles available for renting",
        });
      }
    }
    // Return the found vehicles
    return res.status(200).json({
      status: true,
      count: singleVehicle.length,
      data: singleVehicle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
