import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./common/middleware/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { availabilityRoutes } from "./modules/availability/availability.routes";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";
import { servicesRoutes } from "./modules/services/services.routes";
export const app = express();
const allowedOrigins = new Set(
  (process.env.CORS_ORIGIN ?? "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean),
);
if (process.env.NODE_ENV !== "production") {
  allowedOrigins.add("http://localhost:3000");
  allowedOrigins.add("http://127.0.0.1:3000");
}
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, !origin || allowedOrigins.has(origin));
    },
  }),
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/services", availabilityRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use(notFound);
app.use(errorHandler);
