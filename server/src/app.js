import express from "express";
import authRoute from "./features/auth/authRoute.js";
import cors from "cors";
import pfpRoute from "./features/profile/pfpRoute.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.get("/", (req, res) => res.send("Hello World!"));

//Authentication
app.use("/auth", authRoute);

//Profile
app.use("/profile", pfpRoute);

export default app;
