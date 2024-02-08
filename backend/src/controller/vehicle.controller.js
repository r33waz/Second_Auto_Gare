import cloudinary from "../config/cloudinary.js";
import Vehicle from "../models/vehicle.model.js";
import fs from "fs"

export const Addvehicle = async (req, res) => {
    try {
        const {
            model, brand, year, color, displacement, mileage, fule_type,
            transmission, doors, price, number_of_people, category
        } = req.body;
        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: 'No file uploaded'
            });
        }
        let result;
        if (req.file.mimetype === 'image/jpeg'
            || req.file.mimetype === 'image/png'
            || req.file.mimetype === 'image/jpg') {
            result = await cloudinary.v2.uploader.upload(req.file.path);
            // delete the local file to free up disk space
            fs.unlinkSync(req.file.path)
            console.log('File has been uploaded', result)
        } else {
            return res.status(400).json({
                status: false,
                message: 'Invalid file type. Only jpeg, png, and jpg files are allowed.'
            });
        }
        console.log(req.body)
        console.log(req.file)
        if (!model) {
            return res.status(400).json({
                status: false,
                message: 'Model is required'
            });
        }
        if (!brand) {
            return res.status(400).json({
                status: false,
                message: 'Brand is required'
            });
        }
        if (!color) {
            return res.status(400).json({
                status: false,
                message: 'Color is required'
            });
        }
        if (!year) {
            return res.status(400).json({
                status: false,
                message: 'Year is required'
            });
        }
        if (!displacement) {
            return res.status(400).json({
                status: false,
                message: `Displacement is required`
            });
        }
        if (!fule_type) {
            return res.status(400).json({
                status: false,
                message: 'Fuel type is required'
            });
        }
        if (!transmission) {
            return res.status(400).json({
                status: false,
                message: 'Transmission is required'
            });
        }
        // if (!imageUrl) {
        //     return res.status(400).json({
        //         status: false,
        //         message: 'Image URL is required'
        //     });
        // }
        if (!doors) {
            return res.status(400).json({
                status: false,
                message: 'Number of doors is required'
            });
        }
        if (!price) {
            return res.status(400).json({
                status: false,
                message: 'Price is required'
            });
        }
        if (!number_of_people) {
            return res.status(400).json({
                status: false,
                message: 'Number of people is required'
            });
        }
        if (!category) {
            return res.status(400).json({
                status: false,
                message: 'Select your category'
            });
        }

        const newvehicle = new Vehicle({
            model, brand, year, color, displacement, mileage, fule_type,
            transmission, imageUrl: result.secure_url, doors, price, number_of_people, category
        });
        // Save vehicle to database
        await newvehicle.save()
        return res.status(200).json({
            status: true,
            data: newvehicle,
            message: "Vehicle has been added"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

// Get all vehicles from the database
export const getAllVehicle = async (req, res) => {
    try {
        const vehicles = await Vehicle.find()
        if (!vehicles) {
            return res.status(400).json({
                status: false,
                message: 'No vehicles found in the database'
            })
        } else {
            return res.status(200).json({
                status: true,
                count: vehicles.length,
                data: vehicles,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        })
    }
}
// Get a vehicle by its id
export const getVehicleById = async (req, res) => {
    try {
        const id = req.params.id
        const singleVehicle = await Vehicle.findById({ _id: id })
        if (!singleVehicle) {
            return res.status(404).json({
                status: false,
                message: "Vehicle doesnot exist"
            })
        } else {
            return res.status(200).json({
                status: true,
                data: singleVehicle
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

//Delete vehicle by id
export const deleteVechile = async (req, res) => {
    try {
        const id = req.params.id
        const vehicle = await Vehicle.findById({ _id: id })
        if (!vehicle) {
            return res.status(404).json({
                status: false,
                message: "Vehicle not found!"
            })
        } else {
            const deletevehicle = await Vehicle.findByIdAndDelete({ _id: id })
            return res.status(200).json({
                status: true,
                data: deletevehicle,
                message: 'Deleted Successfully'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

//Update vehicle by finding the vehicle id
export const updateVehicle = async (req, res) => {
    try {
        const id = req.params.id;
        const vehicle = await Vehicle.findById({ _id: id })
        if (!vehicle) {
            return res.status(404).json({
                status: false,
                message: "Vehicle Not Found!"
            })
        }
        else {
            const updatevehicle = await Vehicle.findByIdAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
            return res.status(200).json({
                status: true,
                data: updatevehicle,
                message: "Vehicle updated successfully."
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

//search vehicle according to model
export const searchByModel = async (req, res) => {
    const vehiclebrand = req.query.brand || ""
    const query = { brand: { $regex: vehiclebrand, $options: "i" } }
    try {
        const vehicle = await Vehicle.find(query)
        if (vehicle.length === 0) {
            return res.status(400).json({
                status: false,
                message: `No vehicles found with the model ${vehiclebrand}`
            })
        } else {
            return res.status(200).json({
                status: true,
                count: vehicle.length,
                data: vehicle,
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}
//get vehicle accordin to color
export const getColorVehicles = async (req, res) => {
    const vehicolor = req.query.color || ""
    const query = { color: { $regex: vehicolor, $options: "i" } }
    try {
        const vehicle = await Vehicle.find(query)
        if (vehicle.length === 0) {
            return res.status(400).json({
                status: false,
                message: `No vehicles available in this color`
            })
        } else {
            return res.status(200).json({
                status: true,
                count: vehicle.length,
                data: vehicle
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

//find vehicle by theri fuletype
export const getvehicleFuletype = async (req, res) => {
    const vehiclefule = req.query.fule_type || ""
    const query = { fule_type: { $regex: vehiclefule, $options: "i" } }
    try {
        const vehicle = await Vehicle.find(query)
        if (vehicle.length === 0) {
            return res.status(400).json({
                status: false,
                message: `No vehicles available `
            })
        } else {
            return res.status(200).json({
                status: true,
                count: vehicle.length,
                data: vehicle
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}


//find vehicle according to its displacement
export const findDisplacementVehicles = async (req, res) => {
    const vehicleDisplacement = req.query.displacement || ""
    console.log(vehicleDisplacement)
    const query = { displacement: { $regex: vehicleDisplacement, $options: "i" } }
    console.log(query)
    try {
        const vehicle = await Vehicle.find(query)
        if (!vehicle.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'No vehicle found'
            });
        }
        else {
            return res.status(200).json({
                status: true,
                count: vehicle.length,
                data: vehicle
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}
// find vehicle by transmission
export const findTransmissionVehicles = async (req, res) => {
    const vehicleTransmission = req.query.transmission || ""
    const query = { transmission: { $regex: vehicleTransmission, $options: "i" } }
    console.log(query)
    try {
        const vehicle = await Vehicle.find(query)
        if (vehicle.length === 0) {
            return res.status(400).json({
                status: false,
                message: `No ${vehicleTransmission} vehicle is available`
            })
        } else {
            return res.status(200).json({
                status: true,
                data: vehicle,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }

}
//find by category
export const findByCategory = async (req, res) => {
    const cat_id = req.query.category || "";
    console.log("category :", cat_id)
    let query;
    if (cat_id === 'suv') {
        query = { category: 'suv' };
    } else if (cat_id === 'compactsuv') {
        query = { category: 'compactsuv' };
    } else {
        query = { category: { $regex: cat_id, $options: "i" } };
    }
    console.log(query)
    try {
        const vehicle = await Vehicle.find(query)
        if (vehicle.length === 0) {
            return res.status(400).json({
                status: false,
                // message: 'No vehicles found'
            })
        } else {
            return res.status(200).json({
                stauts: false,
                count: vehicle.length,
                data: vehicle
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

//filter vehicle by status
export const vehicleByStatus = async (req, res) => {
    try {
        let statuses = req.query.status || "";
        //console.log("Categories", categories);

        // Construct query to match categories for selling or renting
        const query = { status: { $in: ["sell", "rent"] } };

        if (statuses) {
            // If categories are provided, filter by those categories
            query.status = { $in: statuses.split(',') };
        }

        // Find vehicles matching the query
        const vehicles = await Vehicle.find(query);

        // Check if vehicles are found for selling or renting
        if (vehicles.length === 0) {
            if (query.status.$in.includes("sell")) {
                return res.status(403).json({
                    status: false,
                    message: "No vehicles available for selling"
                });
            } else if (query.status.$in.includes("rent")) {
                return res.status(400).json({
                    status: false,
                    message: 'No vehicles available for renting'
                });
            }
        }
        // Return the found vehicles
        return res.status(200).json({
            status: true,
            count: vehicles.length,
            data: vehicles
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
