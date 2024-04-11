import express from "express";
import userRoute from "./user.routes.js";
import vehicleRoute from "./vehicle.routes.js";
import rentingRoute from "./renting.routes.js";
import reviweRoute from "./reviews.routes.js";
import commentRoute from "./comment.routes.js";
import conversationRoute from "./conservation.routes.js";
import messageRoute from "./message.routes.js";

const router = express.Router();
router.use("/api/v1", userRoute);
router.use("/api/v1", vehicleRoute);
router.use("/api/v1", rentingRoute);
router.use("/api/v1", reviweRoute);
router.use("/api/v1", commentRoute);
router.use("/api/v1", conversationRoute);
router.use("/api/v1", messageRoute);
export default router;
