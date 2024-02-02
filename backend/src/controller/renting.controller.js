import Renting from "../models/renting.model.js";
import User from "../models/user.model.js"
import Vehicle from "../models/vehicle.model.js";
export const createBooking = async (req, res) => {
    try {
        // get data from body
        const { user, vehicle, startDate, endDate } = req.body;
        // validate the data
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User field is missing"
            });
        }

        if (!vehicle) {
            return res.status(400).json({
                status: false,
                message: "Vehicle field is missing"
            });
        }

        if (!startDate) {
            return res.status(400).json({
                status: false,
                message: "Start Date field is missing"
            });
        }

        if (!endDate) {
            return res.status(400).json({
                status: false,
                message: "End Date field is missing"
            });
        }
        // check if the user exists in database
        const existingUser = await User.findOne({ _id: user });
        if (existingUser.verified) {
            return res.status(400).json({
                status: false,
                message: 'Verify your account'
            })
        }
        // check if the vehicle exists in database
        const existingVehicle = await Vehicle.findById(vehicle);
        if (!existingVehicle) {
            return res.status(400).json({
                status: false,
                message: "Vehicle does not exist."
            });
        }
        let booking = new Renting({
            user: user,
            vehicle: vehicle,
            startDate: startDate,
            endDate: endDate
        });
        await booking.save()
        return res.status(200).json({
            status: true,
            data: booking,
            message: `Booking successfully`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })

    }
}
// get all rentings vehicle
export const getAllRentingsVehicle = async (req, res) => {
    try {
        const bookedvehicle = await Renting.find()
            .populate('user', '_id firstname lastname email phonenumber')
            .populate('vehicle', '_id model brand color imageUrl number_of_people')
            .sort("startDate");
        return res.status(200).json({
            status: true,
            data: bookedvehicle
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}
//get one rental by id
export const getRentingsVehicleById = async (req, res) => {
    const id = req.params.id
    try {
        const bookedvehicle = await Renting.findById({ _id: id })
            .populate('user', '_id firstname lastname email phonenumber')
            .populate('vehicle', '_id model brand color imageUrl number_of_people')
            .sort("startDate");
        return res.status(200).json({
            status: true,
            data: bookedvehicle
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}
//delete renting  by id 
export const deleteRentingsVehicle = async (req, res) => {
    const id = req.params.id
    try {
        const deletevehicle = await Renting.findById({ _id: id })
            .populate('vehicle', '_id model brand color imageUrl number_of_people')
        return res.status(200).json({
            status: true,
            data: bookedvehicle,
            message: 'Vehicle deleted successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

//filter by from stareDate to endDate
export const filterByDates = async (req, res) => {
    //get the start and end date from query params
    let { startDate, endDate } = req.query;
    try {
    
    } catch (error) {
        
    }
}