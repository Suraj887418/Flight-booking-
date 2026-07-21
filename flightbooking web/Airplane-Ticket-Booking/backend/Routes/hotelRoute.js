import express from "express";

import { syncApiHotel, getAllHotels } from "../controller/hotelController.js";

const router = express.Router();

router.post("/sync-api-hotel", syncApiHotel);
router.get("/getAllHotels", getAllHotels);

export default router;
