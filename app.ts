require("dotenv").config();

import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import analyticsRouter from "./routes/analytics.route";
import notificationRoute from "./routes/notification.route";
import layoutRouter from "./routes/layout.route";
import { ErrorMiddleware } from "./middleware/error";
import { rateLimit } from "express-rate-limit";
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
// Adjust the size as per your needs

app.use(
  cors({
    // origin: ["https://lernify1.vercel.app/"], // Adjust this to your frontend domain
    origin: ["https://lernify1.vercel.app"], // Adjust this to your frontend domain
    credentials: true, // Allow sending cookies
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 100 requests per windowMs
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json());

// Define your routes after the CORS middleware
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRoute,
  analyticsRouter,
  layoutRouter
);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(limiter);

app.use(ErrorMiddleware);
