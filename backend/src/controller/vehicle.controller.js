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
      drive_type,
      transmission,
      description,
      meta_description,
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
    if (!description) {
      return res.status(400).json({
        status: false,
        message: `Description is required`,
      });
    }
    if (!meta_description) {
      return res.status(400).json({
        status: false,
        message: `Meta description is required`,
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
    if (!drive_type) {
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
      drive_type,
      transmission,
      imageUrl: results,
      doors,
      description,
      meta_description,
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
          select: "_id firstname lastname photo",
        },
      })
      .populate("user", "_id firstname lastname email phonenumber photo")
      .sort([["createdAt", -1]]);
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
    const singleVehicle = await Vehicle.findById(id)
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
      return res.status(400).json({
        status: false,
        message: "Invalid Attempt",
      });
    } else {
      console.log("body", req.body);
      console.log("file", req.file);

      if (!req.files) {
        // Updating user without image
        const updateUser = await Vehicle.findByIdAndUpdate(
          { _id: id },
          { ...req.body, imageUrl: vehicle?.imageUrl }
        );

        if (!updateUser) {
          return res.status(400).json({
            status: false,
            message: "Invalid Attempt",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: `${updateUser.firstname} ${updateUser.lastname} updated`,
          });
        }
      } else {
        // Update user with image
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

        // Deleting old images from cloudinary if they exist
        if (vehicle?.imageUrl) {
          //deleting old images from cloudinary
          for (let photo of vehicle.imageUrl) {
            await cloudinary.v2.uploader.destroy(photo?.public_id);
          }
        }

        // Update the user information
        const updateVehicle = await Vehicle.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              ...req.body,
              imageUrl: results.length > 0 ? results : vehicle?.imageUrl,
            },
          },
          { new: true }
        );
        if (!updateVehicle) {
          return res.status(400).json({
            status: false,
            message: "Invalid Attempt",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: `Vehicle updated`,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//search vehicle according to model

//get vehicle accordeng tha schema
export const searchVehicle = async (req, res) => {
  try {
    let {
      brand,
      color,
      year,
      fuel_type,
      displacement,
      min,
      max,
      transmission,
      category,
    } = req.query;

    const query = {};

    if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    }
    if (color) {
      query.color = { $regex: color, $options: "i" };
    }
    if (year) {
      query.year = parseInt(year);
    }
    if (fuel_type) {
      query.fuel_type = { $regex: fuel_type, $options: "i" };
    }
    if (displacement) {
      query.displacement = parseInt(displacement);
    }
    if (transmission) {
      query.transmission = { $regex: transmission, $options: "i" };
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    if (min || max) {
      query.price = {};
      if (min) {
        query.price.$gte = parseInt(min);
      }
      if (max) {
        query.price.$lte = parseInt(max);
      }
    }

    const vehicles = await Vehicle.find(query)
      .populate("user", "_id firstname lastname email phonenumber photo")
      .sort({ createdAt: -1 });

    if (vehicles.length === 0) {
      return res.status(200).json({
        status: true,
        data: [],
        message: "No matching results were found",
      });
    } else {
      const formattedVehicles = vehicles
      return res.status(200).json({
        status: true,
        data: formattedVehicles,
        count: formattedVehicles.length,
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