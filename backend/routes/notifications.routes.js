import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/getall", protectRoute, getNotifications);
router.delete("/delete", protectRoute, deleteNotifications);

export default router;
