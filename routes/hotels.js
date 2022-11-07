import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getallHotels,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controller/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/", verifyAdmin, createHotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/find/:id", getHotel);
router.get("/", getallHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
export default router;
