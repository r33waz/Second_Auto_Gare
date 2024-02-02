import express from "express";
import userRoute from "./user.routes.js";
import vehicleRoute from "./vehicle.routes.js"
import rentingRoute from "./renting.routes.js"
const router = express.Router();
router.use("/api/v1", userRoute);
router.use("/api/v1", vehicleRoute)
router.use("/api/v1",rentingRoute)
export default router;
