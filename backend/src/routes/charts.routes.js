import express from "express";
import {
  VehicleStatus,
  UserCategory,
  VehicleCategory,
  RentingByDate,
} from "../controller/charts.controller.js";

const router = express.Router();
router.get("/user_category", UserCategory);
router.get("/vehicle_category", VehicleCategory);
router.get("/vehicle_status", VehicleStatus);
router.get("/vehicle_booking", RentingByDate);
export default router;
