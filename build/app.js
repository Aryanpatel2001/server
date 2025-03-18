"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const layout_route_1 = __importDefault(require("./routes/layout.route"));
const error_1 = require("./middleware/error");
const express_rate_limit_1 = require("express-rate-limit");
exports.app.use(express_1.default.json({ limit: "10mb" }));
exports.app.use((0, cookie_parser_1.default)());
// Adjust the size as per your needs
exports.app.use((0, cors_1.default)({
    // origin: ["https://lernify1.vercel.app/"], // Adjust this to your frontend domain
    origin: ["https://lernify1.vercel.app"], // Adjust this to your frontend domain
    credentials: true, // Allow sending cookies
}));
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 100 requests per windowMs
    standardHeaders: "draft-7",
    legacyHeaders: false,
});
exports.app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
exports.app.use(express_1.default.json());
// Define your routes after the CORS middleware
exports.app.use("/api/v1", user_route_1.default, course_route_1.default, order_route_1.default, notification_route_1.default, analytics_route_1.default, layout_route_1.default);
//testing api
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Api is working",
    });
});
exports.app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
exports.app.use(limiter);
exports.app.use(error_1.ErrorMiddleware);
