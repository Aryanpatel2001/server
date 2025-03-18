import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
import { updateAccessToken } from "../controllers/user.controllers";

const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notification",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);
notificationRoute.put(
  "/update-notification/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRoute;
