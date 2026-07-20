import { db } from "../../config/db.js";

export const getAllModules = async () => {
  const [rows] = await db.query("SELECT * FROM modules ORDER BY display_order ASC");
  return rows;
};

export const getModuleById = async (moduleId) => {
  const [rows] = await db.query("SELECT * FROM modules WHERE module_id = ?", [moduleId]);
  return rows[0];
};

export const createModule = async (module) => {
  const [result] = await db.query(`
    INSERT INTO modules (title, description, difficulty, estimated_minutes, display_order, is_published)
    VALUES (?, ?, ?, ?, ?, ?)`, [
    module.title, module.description, module.difficulty, module.estimated_minutes,
    module.display_order, module.is_published,
  ]);
  return result.insertId;
};

export const updateModule = async (moduleId, module) => {
  const [result] = await db.query(`
    UPDATE modules SET title = ?, description = ?, difficulty = ?, estimated_minutes = ?,
      display_order = ?, is_published = ? WHERE module_id = ?`, [
    module.title, module.description, module.difficulty, module.estimated_minutes,
    module.display_order, module.is_published, moduleId,
  ]);
  return result;
};

export const deleteModule = async (moduleId) => {
  const [result] = await db.query("DELETE FROM modules WHERE module_id = ?", [moduleId]);
  return result;
};

export const getModuleLessonCount = async (moduleId) => {
  const [rows] = await db.query("SELECT COUNT(*) AS total FROM lessons WHERE module_id = ?", [moduleId]);
  return Number(rows[0].total);
};

export const getDashboardSummary = async () => {
  const [moduleCounts, lessonCounts, userCounts, recentModules, recentLessons, modulesWithoutLessons] =
    await Promise.all([
      db.query(`
        SELECT
          COUNT(*) AS total,
          COALESCE(SUM(is_published = 1), 0) AS published,
          COALESCE(SUM(is_published = 0), 0) AS unpublished
        FROM modules
      `),
      db.query(`
        SELECT
          COUNT(*) AS total,
          COALESCE(SUM(pdf_url IS NOT NULL AND pdf_url <> ''), 0) AS with_pdf,
          COALESCE(SUM(pdf_url IS NULL OR pdf_url = ''), 0) AS without_pdf
        FROM lessons
      `),
      db.query("SELECT COUNT(*) AS total FROM users"),
      db.query(`
        SELECT module_id, title, is_published, updated_at
        FROM modules
        ORDER BY updated_at DESC, module_id DESC
        LIMIT 5
      `),
      db.query(`
        SELECT l.lesson_id, l.title, l.updated_at, m.title AS module_title
        FROM lessons l
        JOIN modules m ON m.module_id = l.module_id
        ORDER BY l.updated_at DESC, l.lesson_id DESC
        LIMIT 5
      `),
      db.query(`
        SELECT m.module_id, m.title
        FROM modules m
        LEFT JOIN lessons l ON l.module_id = m.module_id
        GROUP BY m.module_id, m.title
        HAVING COUNT(l.lesson_id) = 0
        ORDER BY m.display_order ASC, m.module_id ASC
      `),
    ]);

  const toNumber = (value) => Number(value) || 0;
  const modules = moduleCounts[0][0];
  const lessons = lessonCounts[0][0];

  return {
    modules: {
      total: toNumber(modules.total),
      published: toNumber(modules.published),
      unpublished: toNumber(modules.unpublished),
    },
    lessons: {
      total: toNumber(lessons.total),
      with_pdf: toNumber(lessons.with_pdf),
      without_pdf: toNumber(lessons.without_pdf),
    },
    users: { total: toNumber(userCounts[0][0].total) },
    recent_modules: recentModules[0],
    recent_lessons: recentLessons[0],
    modules_without_lessons: modulesWithoutLessons[0],
  };
};
