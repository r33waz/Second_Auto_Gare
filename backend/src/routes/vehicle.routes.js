import express from "express"
import { Addvehicle, deleteVechile, getAllVehicle, getVehicleById, searchVehicle, updateVehicle} from "../controller/vehicle.controller.js"
import { upload } from "../middleware/multter.middleware.js"
const router = express.Router()
router.post("/add_vehicle", upload.array("imageUrl",5), Addvehicle)
router.get("/get_allvehicles", getAllVehicle)
router.get("/get_vehicle/:id", getVehicleById)
router.delete("/delete_vehicle/:id", deleteVechile)
router.patch("/update_vehicle/:id", upload.array("imageUrl", 5), updateVehicle)
router.get("/vehicles/search", searchVehicle)
export default router