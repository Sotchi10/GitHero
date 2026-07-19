import {
  completeLessonProgress, getAvailableLesson, getAvailableModuleById, getDashboardSummary,
  getAvailableModules, getLessonsByModuleId, startLessonProgress,
} from "./moduleModels.js";

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};
const getUserId = (req) => parseId(req.auth?.userId);

export const listModules = async (req, res) => {
  try { return res.json(await getAvailableModules(getUserId(req))); }
  catch (err) { console.error("Get learner modules error:", err); return res.status(500).json({ message: "Failed to load modules" }); }
};

export const getUserDashboardSummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Authentication required" });
    return res.json(await getDashboardSummary(userId));
  } catch (err) { console.error("Get learner dashboard summary error:", err); return res.status(500).json({ message: "Failed to load dashboard summary" }); }
};

export const getModule = async (req, res) => {
  try {
    const module = await getAvailableModuleById(parseId(req.params.id), getUserId(req));
    return module ? res.json(module) : res.status(404).json({ message: "Module not found" });
  } catch (err) { console.error("Get learner module error:", err); return res.status(500).json({ message: "Failed to load module" }); }
};

export const listModuleLessons = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);
    const userId = getUserId(req);
    if (!(await getAvailableModuleById(moduleId, userId))) return res.status(404).json({ message: "Module not found" });
    return res.json(await getLessonsByModuleId(moduleId, userId));
  } catch (err) { console.error("Get learner lessons error:", err); return res.status(500).json({ message: "Failed to load lessons" }); }
};

const updateProgress = (update, message) => async (req, res) => {
  try {
    const userId = getUserId(req);
    const lessonId = parseId(req.params.lessonId);
    if (!userId) return res.status(401).json({ message: "Authentication required" });
    if (!lessonId) return res.status(400).json({ message: "Invalid lesson ID" });
    const lesson = await getAvailableLesson(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    await update(userId, lessonId);
    const module = await getAvailableModuleById(lesson.module_id, userId);
    const lessons = await getLessonsByModuleId(lesson.module_id, userId);
    const dashboard = await getDashboardSummary(userId);
    return res.json({ message, lesson_id: lessonId, module, lessons, dashboard });
  } catch (err) { console.error("Update lesson progress error:", err); return res.status(500).json({ message: "Failed to update lesson progress" }); }
};

export const openLesson = updateProgress(startLessonProgress, "Lesson opened successfully");
export const completeLesson = updateProgress(completeLessonProgress, "Lesson completed successfully");
