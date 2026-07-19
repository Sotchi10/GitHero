import { getModuleById } from "../modules/moduleModels.js";
import fs from "fs/promises";
import path from "path";
import {
  createLesson,
  deleteLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  updateLessonPdfUrl,
  updateModuleLessonTotal,
} from "./lessonModels.js";

const lessonsUploadDir = path.resolve(process.cwd(), "upload", "lesson");

const removeStoredPdf = async (pdfUrl) => {
  const prefix = "/upload/lesson/";
  if (!pdfUrl?.startsWith(prefix)) return;

  const filePath = path.resolve(lessonsUploadDir, path.basename(pdfUrl));
  if (!filePath.startsWith(`${lessonsUploadDir}${path.sep}`)) return;

  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
};

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const validateLesson = (lesson) => {
  if (!lesson?.title?.trim()) return "Title is required";
  if (!parseId(lesson.module_id)) return "A valid module ID is required";
  if (!Number.isInteger(Number(lesson.display_order)) || Number(lesson.display_order) < 0) {
    return "Display order must be a non-negative integer";
  }
  return null;
};

export const getLessons = async (_req, res) => {
  try {
    res.json(await getAllLessons());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load lessons" });
  }
};

export const getLesson = async (req, res) => {
  try {
    const lessonId = parseId(req.params.id);
    if (!lessonId) return res.status(400).json({ message: "Invalid lesson ID" });
    const lesson = await getLessonById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load lesson" });
  }
};

export const addLesson = async (req, res) => {
  try {
    const validationError = validateLesson(req.body);
    if (validationError) return res.status(400).json({ message: validationError });
    if (!await getModuleById(req.body.module_id)) {
      return res.status(404).json({ message: "Module not found" });
    }
    const lessonId = await createLesson(req.body);
    await updateModuleLessonTotal(req.body.module_id);
    res.status(201).json({ message: "Lesson created successfully", lesson_id: lessonId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create lesson" });
  }
};

export const editLesson = async (req, res) => {
  try {
    const lessonId = parseId(req.params.id);
    if (!lessonId) return res.status(400).json({ message: "Invalid lesson ID" });
    const validationError = validateLesson(req.body);
    if (validationError) return res.status(400).json({ message: validationError });
    const existingLesson = await getLessonById(lessonId);
    if (!existingLesson) return res.status(404).json({ message: "Lesson not found" });
    if (!await getModuleById(req.body.module_id)) {
      return res.status(404).json({ message: "Module not found" });
    }
    await updateLesson(lessonId, req.body);
    await updateModuleLessonTotal(existingLesson.module_id);
    if (Number(existingLesson.module_id) !== Number(req.body.module_id)) {
      await updateModuleLessonTotal(req.body.module_id);
    }
    res.json({ message: "Lesson updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update lesson" });
  }
};

export const removeLesson = async (req, res) => {
  try {
    const lessonId = parseId(req.params.id);
    if (!lessonId) return res.status(400).json({ message: "Invalid lesson ID" });
    const lesson = await getLessonById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    await deleteLesson(lessonId);
    await removeStoredPdf(lesson.pdf_url);
    await updateModuleLessonTotal(lesson.module_id);
    res.json({ message: "Lesson deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete lesson" });
  }
};

export const uploadLessonPdf = async (req, res) => {
  let uploadedPdfUrl;
  try {
    const lessonId = parseId(req.params.id);
    if (!lessonId) return res.status(400).json({ message: "Invalid lesson ID" });
    if (!req.file) return res.status(400).json({ message: "PDF file is required" });

    uploadedPdfUrl = `/upload/lesson/${req.file.filename}`;
    const lesson = await getLessonById(lessonId);
    if (!lesson) {
      await removeStoredPdf(uploadedPdfUrl);
      return res.status(404).json({ message: "Lesson not found" });
    }

    await updateLessonPdfUrl(lessonId, uploadedPdfUrl);
    await removeStoredPdf(lesson.pdf_url);
    res.json({ message: "Lesson PDF uploaded successfully", pdf_url: uploadedPdfUrl });
  } catch (err) {
    if (uploadedPdfUrl) await removeStoredPdf(uploadedPdfUrl);
    console.error(err);
    res.status(500).json({ message: "Failed to upload lesson PDF" });
  }
};

export const removeLessonPdf = async (req, res) => {
  try {
    const lessonId = parseId(req.params.id);
    if (!lessonId) return res.status(400).json({ message: "Invalid lesson ID" });
    const lesson = await getLessonById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    if (!lesson.pdf_url) return res.status(404).json({ message: "Lesson PDF not found" });

    await updateLessonPdfUrl(lessonId, null);
    await removeStoredPdf(lesson.pdf_url);
    res.json({ message: "Lesson PDF removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove lesson PDF" });
  }
};
