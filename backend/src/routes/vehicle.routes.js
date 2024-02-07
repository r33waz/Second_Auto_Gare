import express from "express"
import { Addvehicle, deleteVechile,findByCategory,findDisplacementVehicles, findTransmissionVehicles, getAllVehicle, getColorVehicles, getVehicleById, getvehicleFuletype, searchByModel, updateVehicle, vehicleByStatus } from "../controller/vehicle.controller.js"
import { upload } from "../middleware/multter.middleware.js"
const router = express.Router()
router.post("/add_vehicle", upload.array("photo", 5), Addvehicle)
router.get("/get_allvehicles", getAllVehicle)
router.get("/get_vehicle/:id", getVehicleById)
router.delete("/delete_vehicle/:id", deleteVechile)
router.patch("/update_vehicle/:id", updateVehicle)
router.get("/vehicle", searchByModel)
router.get("/vehicle/color/", getColorVehicles);
router.get("/vehicle/displacement/", findDisplacementVehicles)
router.get("/vehicle/transmission/", findTransmissionVehicles)
router.get("/vehicle/category/",findByCategory)
router.get("/vehicle/status/", vehicleByStatus)
router.get("/vehicle/fule_type/", getvehicleFuletype)



export default router