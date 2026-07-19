import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./features/auth/authRoute.js";
import pfpRoute from "./features/profile/pfpRoute.js";
import postsRoute from "./features/posts/postsRoute.js";
import userRoute from "./features/users/usersRoute.js";
import repositoryRoute from "./features/repository/repositoryRoute.js";
import notesRoute from "./features/notes/notesRoute.js";
import moduleRoute, {
  adminModuleRoute,
} from "./admin/modules/moduleRoutes.js";
import lessonRoute from "./admin/lessons/lessonRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);;


const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../uploads"))
);

app.use(
  "/upload/lesson",
  express.static(path.resolve(__dirname, "../upload/lesson"))
);

app.get("/", (req, res) => {
  res.json({
    message: "GitHero API is running",
  });
});

// Authentication
app.use("/auth", authRoute);

// Profile
app.use("/api/profile", pfpRoute);

// Community
app.use("/api/posts", postsRoute);
app.use("/api/users", userRoute);

// Repositories
app.use("/api/repositories", repositoryRoute);

// Notes
app.use("/api/notes", notesRoute);

// Modules and lessons
app.use("/api/modules", moduleRoute);
app.use("/api/admin/modules", adminModuleRoute);
app.use("/api/lessons", lessonRoute);

// Unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

export default app;
