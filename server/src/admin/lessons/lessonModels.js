import { db } from "../../config/db.js";

export const getAllLessons = async () => {
  const [rows] = await db.query(`
    SELECT l.*, m.title AS module_title
    FROM lessons l
    JOIN modules m ON m.module_id = l.module_id
    ORDER BY m.display_order ASC, l.display_order ASC
  `);
  return rows;
};

export const getLessonById = async (lessonId) => {
  const [rows] = await db.query("SELECT * FROM lessons WHERE lesson_id = ?", [lessonId]);
  return rows[0];
};

export const createLesson = async (lesson) => {
  const [result] = await db.query(`
    INSERT INTO lessons (module_id, title, description, content, code_example, example_output, display_order, estimated_minutes, pdf_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    lesson.module_id,
    lesson.title,
    lesson.description || null,
    lesson.content || null,
    lesson.code_example || null,
    lesson.example_output || null,
    lesson.display_order,
    lesson.estimated_minutes || null,
    lesson.pdf_url || null,
  ]);
  return result.insertId;
};

export const updateLesson = async (lessonId, lesson) => {
  await db.query(`
    UPDATE lessons
    SET module_id = ?, title = ?, description = ?, content = ?, code_example = ?, example_output = ?, display_order = ?, estimated_minutes = ?, pdf_url = COALESCE(?, pdf_url)
    WHERE lesson_id = ?
  `, [
    lesson.module_id,
    lesson.title,
    lesson.description || null,
    lesson.content || null,
    lesson.code_example || null,
    lesson.example_output || null,
    lesson.display_order,
    lesson.estimated_minutes || null,
    lesson.pdf_url || null,
    lessonId,
  ]);
};

export const updateLessonPdfUrl = async (lessonId, pdfUrl) => {
  await db.query("UPDATE lessons SET pdf_url = ? WHERE lesson_id = ?", [pdfUrl, lessonId]);
};

export const deleteLesson = async (lessonId) => {
  await db.query("DELETE FROM lessons WHERE lesson_id = ?", [lessonId]);
};

