import { db } from "../../config/db.js";

export const getAllModules = async () => {
  const [rows] = await db.query(`
    SELECT *
    FROM modules
    ORDER BY display_order ASC
  `);

  return rows;
};

export const getAvailableModules = async () => {
  const [rows] = await db.query(`
    SELECT *
    FROM modules
    WHERE is_published = 1
    ORDER BY display_order ASC
  `);
  return rows;
};

export const getModuleById = async (moduleId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM modules
    WHERE module_id = ?
    `,
    [moduleId]
  );

  return rows[0];
};

export const getAvailableModuleById = async (moduleId) => {
  const [rows] = await db.query(
    "SELECT * FROM modules WHERE module_id = ? AND is_published = 1",
    [moduleId]
  );
  return rows[0];
};

export const getLessonsByModuleId = async (moduleId) => {
  const [rows] = await db.query(
    "SELECT * FROM lessons WHERE module_id = ? ORDER BY display_order ASC",
    [moduleId]
  );
  return rows;
};

export const createModule = async (module) => {
  const {
    title,
    description,
    difficulty,
    estimated_minutes,
    display_order,
    is_published,
  } = module;

  const [result] = await db.query(
    `
    INSERT INTO modules
    (
      title,
      description,
      difficulty,
      estimated_minutes,
      total_lessons,
      display_order,
      is_published
    )
    VALUES (?,?,?,?,?,?,?)
    `,
    [
      title,
      description,
      difficulty,
      estimated_minutes,
      0,
      display_order,
      is_published,
    ]
  );

  return result.insertId;
};

export const updateModule = async (id, module) => {
  const {
    title,
    description,
    difficulty,
    estimated_minutes,
    display_order,
    is_published,
  } = module;

  const [result] = await db.query(
    `
    UPDATE modules
    SET
      title=?,
      description=?,
      difficulty=?,
      estimated_minutes=?,
      display_order=?,
      is_published=?
    WHERE module_id=?
    `,
    [
      title,
      description,
      difficulty,
      estimated_minutes,
      display_order,
      is_published,
      id,
    ]
  );

  return result;
};

export const deleteModule = async (id) => {
  const [result] = await db.query(
    `
    DELETE FROM modules
    WHERE module_id=?
    `,
    [id]
  );

  return result;
};

export const getModuleLessonCount = async (moduleId) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS total FROM lessons WHERE module_id = ?",
    [moduleId]
  );
  return rows[0].total;
};

export const getDashboardSummary = async () => {
  const [moduleCounts, lessonCounts, userCounts, recentModules, recentLessons, modulesWithoutLessons] =
    await Promise.all([
      db.query(`
        SELECT
          COUNT(*) AS total,
          COALESCE(SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END), 0) AS published,
          COALESCE(SUM(CASE WHEN is_published = 1 THEN 0 ELSE 1 END), 0) AS unpublished
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
        SELECT module_id, title, is_published, created_at, updated_at
        FROM modules
        ORDER BY updated_at DESC, created_at DESC
        LIMIT 5
      `),
      db.query(`
        SELECT l.lesson_id, l.title, m.title AS module_title, l.created_at, l.updated_at
        FROM lessons l
        JOIN modules m ON m.module_id = l.module_id
        ORDER BY l.updated_at DESC, l.created_at DESC
        LIMIT 5
      `),
      db.query(`
        SELECT m.module_id, m.title, m.is_published, m.created_at, m.updated_at
        FROM modules m
        LEFT JOIN lessons l ON l.module_id = m.module_id
        GROUP BY m.module_id, m.title, m.is_published, m.created_at, m.updated_at
        HAVING COUNT(l.lesson_id) = 0
        ORDER BY m.updated_at DESC, m.created_at DESC
      `),
    ]);

  return {
    modules: moduleCounts[0][0],
    lessons: lessonCounts[0][0],
    users: userCounts[0][0],
    recent_modules: recentModules[0],
    recent_lessons: recentLessons[0],
    modules_without_lessons: modulesWithoutLessons[0],
  };
};
