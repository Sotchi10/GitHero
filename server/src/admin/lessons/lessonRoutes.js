import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import { addLesson, editLesson, getLesson, getLessons, removeLesson, removeLessonPdf, uploadLessonPdf } from "./lessonController.js";

const lessonsUploadDir = path.resolve(process.cwd(), "upload", "lesson");
fs.mkdirSync(lessonsUploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: lessonsUploadDir,
    filename: (_req, file, callback) => callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`),
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const isPdf = file.mimetype === "application/pdf" && path.extname(file.originalname).toLowerCase() === ".pdf";
    callback(isPdf ? null : new Error("Only PDF files are allowed"), isPdf);
  },
});

const lessonRoute = express.Router();

lessonRoute.use(requireAuth, requireAdmin);
lessonRoute.get("/", getLessons);
lessonRoute.get("/:id", getLesson);
lessonRoute.post("/", addLesson);
lessonRoute.put("/:id", editLesson);
lessonRoute.post("/:id/pdf", upload.single("pdf"), uploadLessonPdf);
lessonRoute.delete("/:id/pdf", removeLessonPdf);
lessonRoute.delete("/:id", removeLesson);

lessonRoute.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "PDF file must be 10 MB or smaller" });
  }
  if (err.message === "Only PDF files are allowed") {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Failed to upload lesson PDF" });
});

export default lessonRoute;
