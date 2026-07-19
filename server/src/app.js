import express from "express";
import authRoute from "./features/auth/authRoute.js";
import cors from "cors";
import pfpRoute from "./features/profile/pfpRoute.js";
import postsRoute from "./features/posts/postsRoute.js";
import userRoute from "./features/users/usersRoute.js";
import repositoryRoute from "./features/repository/repositoryRoute.js";
import notesRoute from "./features/notes/notesRoute.js";
import moduleRoute, { adminModuleRoute } from "./admin/modules/moduleRoutes.js";
import lessonRoute from "./admin/lessons/lessonRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://githero-kappa.vercel.app/",
  credentials: true
}));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
app.use("/upload/lesson", express.static(path.resolve(__dirname, "../upload/lesson")));

// Routes
app.get("/", (req, res) => res.send("Hello World!"));

//Authentication
app.use("/auth", authRoute);

//Profile
app.use("/api/profile", pfpRoute);
//app.use("/api/profile/user", pfpRoute);

//Community
app.use("/api/posts", postsRoute);
app.use("/api/users", userRoute);

//Repositories
app.use("/api/repositories", repositoryRoute);

//Notes
app.use("/api/notes", notesRoute);

//Modules
app.use("/api/modules", moduleRoute);
app.use("/api/admin/modules", adminModuleRoute);
app.use("/api/lessons", lessonRoute);

export default app;
