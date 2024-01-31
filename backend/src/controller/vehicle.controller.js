import Vehicle from "../models/vehicle.model.js";

export const Addvehicle = async (req, res) => {
    try {
        let {
            model, brand, year, color, mileage, fuel_type,
            transmission, imageUrl, doors, price, number_of_people
        } = req.body;
        console.log(req.body)
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
        if (!fuel_type) {
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
        if (!imageUrl) {
            return res.status(400).json({
                status: false,
                message: 'Image URL is required'
            });
        }
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

        const newvehicle = new Vehicle({
            model, brand, year, color, mileage, fuel_type,
            transmission, imageUrl, doors, price, number_of_people
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