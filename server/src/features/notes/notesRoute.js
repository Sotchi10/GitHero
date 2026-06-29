import express from "express";
import { db } from "../../config/db.js";

const notesRoute = express.Router();

const ensureNoteTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      lesson_id INT NOT NULL,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uq_user_lesson (user_id, lesson_id)
    )
  `);
};

const getUserId = (req) => {
  const userId = req.user?.id ?? req.user?.userId ?? req.headers["x-user-id"];
  if (userId) return Number(userId);

  const fallback = Number(process.env.DEFAULT_NOTE_USER_ID ?? 1);
  return Number.isFinite(fallback) ? fallback : 1;
};

notesRoute.use(async (_req, _res, next) => {
  try {
    await ensureNoteTable();
    next();
  } catch (error) {
    next(error);
  }
});

notesRoute.get("/:lessonId", async (req, res) => {
  const userId = getUserId(req);
  const { lessonId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT content FROM notes WHERE user_id = ? AND lesson_id = ?",
      [userId, lessonId],
    );

    if (rows.length === 0) {
      return res.json({ lessonId, content: "" });
    }

    res.json({ lessonId, content: rows[0].content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch note" });
  }
});

notesRoute.post("/:lessonId", async (req, res) => {
  const userId = getUserId(req);
  const { lessonId } = req.params;
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json({ error: "content is required" });
  }

  try {
    await db.query(
      `INSERT INTO notes (user_id, lesson_id, content)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content), updated_at = CURRENT_TIMESTAMP`,
      [userId, lessonId, content],
    );

    res.json({ lessonId, content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save note" });
  }
});

export default notesRoute;
