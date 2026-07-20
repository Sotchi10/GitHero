import { db } from "../../config/db.js";

export const getAvailableModules = async (userId) => {
  const [rows] = await db.query(`
    SELECT m.module_id, m.title, m.description, m.difficulty, m.estimated_minutes,
      m.display_order, m.is_published, m.created_at, m.updated_at,
      COUNT(l.lesson_id) AS published_lessons,
      COALESCE(SUM(CASE WHEN ulp.status = 'completed' THEN 1 ELSE 0 END), 0) AS completed_lessons,
      CASE WHEN COUNT(l.lesson_id) = 0 THEN 0 ELSE ROUND(
        COALESCE(SUM(CASE WHEN ulp.status = 'completed' THEN 1 ELSE 0 END), 0) * 100.0 / COUNT(l.lesson_id)
      ) END AS progress_percent,
      CASE WHEN COUNT(l.lesson_id) > 0 AND COUNT(l.lesson_id) =
        SUM(CASE WHEN ulp.status = 'completed' THEN 1 ELSE 0 END) THEN 1 ELSE 0 END AS is_completed
    FROM modules m
    LEFT JOIN lessons l ON l.module_id = m.module_id
    LEFT JOIN user_lesson_progress ulp ON ulp.lesson_id = l.lesson_id AND ulp.user_id = ?
    WHERE m.is_published = 1
    GROUP BY m.module_id, m.title, m.description, m.difficulty, m.estimated_minutes,
      m.display_order, m.is_published, m.created_at, m.updated_at
    ORDER BY m.display_order ASC`, [userId]);

  return rows.map((row) => ({
    ...row,
    published_lessons: Number(row.published_lessons),
    completed_lessons: Number(row.completed_lessons),
    progress_percent: Number(row.progress_percent),
    is_completed: Boolean(row.is_completed),
  }));
};

export const getAvailableModuleById = async (moduleId, userId) => {
  const [rows] = await db.query(`
    SELECT m.*, COUNT(l.lesson_id) AS published_lessons,
      COALESCE(SUM(CASE WHEN ulp.status = 'completed' THEN 1 ELSE 0 END), 0) AS completed_lessons,
      CASE WHEN COUNT(l.lesson_id) = 0 THEN 0 ELSE ROUND(
        COALESCE(SUM(CASE WHEN ulp.status = 'completed' THEN 1 ELSE 0 END), 0) * 100.0 / COUNT(l.lesson_id)
      ) END AS progress_percent
    FROM modules m
    LEFT JOIN lessons l ON l.module_id = m.module_id
    LEFT JOIN user_lesson_progress ulp ON ulp.lesson_id = l.lesson_id AND ulp.user_id = ?
    WHERE m.module_id = ? AND m.is_published = 1
    GROUP BY m.module_id`, [userId, moduleId]);
  if (!rows[0]) return null;
  return { ...rows[0], published_lessons: Number(rows[0].published_lessons), completed_lessons: Number(rows[0].completed_lessons), progress_percent: Number(rows[0].progress_percent) };
};

export const getLessonsByModuleId = async (moduleId, userId) => {
  const [rows] = await db.query(`
    SELECT l.*, COALESCE(ulp.status, 'not_started') AS progress_status,
      COALESCE(ulp.progress_percent, 0) AS progress_percent, ulp.started_at,
      ulp.last_accessed_at, ulp.completed_at
    FROM lessons l
    LEFT JOIN user_lesson_progress ulp ON ulp.lesson_id = l.lesson_id AND ulp.user_id = ?
    JOIN modules m ON m.module_id = l.module_id AND m.is_published = 1
    WHERE l.module_id = ?
    ORDER BY l.display_order ASC`, [userId, moduleId]);
  return rows.map((row) => ({ ...row, progress_percent: Number(row.progress_percent) }));
};

export const getAvailableLesson = async (lessonId) => {
  const [rows] = await db.query(`
    SELECT l.lesson_id, l.module_id FROM lessons l
    JOIN modules m ON m.module_id = l.module_id
    WHERE l.lesson_id = ? AND m.is_published = 1`, [lessonId]);
  return rows[0] || null;
};

export const startLessonProgress = (userId, lessonId) => db.query(`
  INSERT INTO user_lesson_progress (user_id, lesson_id, status, progress_percent, started_at, last_accessed_at)
  VALUES (?, ?, 'in_progress', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  ON DUPLICATE KEY UPDATE
    status = CASE WHEN status = 'completed' THEN 'completed' ELSE 'in_progress' END,
    progress_percent = CASE WHEN status = 'completed' THEN progress_percent ELSE GREATEST(progress_percent, 0) END,
    last_accessed_at = CURRENT_TIMESTAMP`, [userId, lessonId]);

export const completeLessonProgress = (userId, lessonId) => db.query(`
  INSERT INTO user_lesson_progress (user_id, lesson_id, status, progress_percent, started_at, last_accessed_at, completed_at)
  VALUES (?, ?, 'completed', 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  ON DUPLICATE KEY UPDATE
    status = 'completed', progress_percent = 100,
    completed_at = COALESCE(completed_at, CURRENT_TIMESTAMP),
    last_accessed_at = CURRENT_TIMESTAMP`, [userId, lessonId]);

export const getDashboardSummary = async (userId) => {
  const [[summaryRows], [completedModuleRows], [nextRows], [completionDays]] = await Promise.all([
    db.query(`
      SELECT COUNT(DISTINCT m.module_id) AS total_modules, COUNT(l.lesson_id) AS total_lessons,
        COALESCE(SUM(ulp.status = 'completed'), 0) AS completed_lessons
      FROM modules m
      LEFT JOIN lessons l ON l.module_id = m.module_id
      LEFT JOIN user_lesson_progress ulp ON ulp.lesson_id = l.lesson_id AND ulp.user_id = ?
      WHERE m.is_published = 1`, [userId]),
    db.query(`
      SELECT COUNT(*) AS completed_modules
      FROM (
        SELECT m.module_id
        FROM modules m
        JOIN lessons l ON l.module_id = m.module_id
        LEFT JOIN user_lesson_progress ulp ON ulp.lesson_id = l.lesson_id AND ulp.user_id = ?
        WHERE m.is_published = 1
        GROUP BY m.module_id
        HAVING COUNT(l.lesson_id) = SUM(ulp.status = 'completed')
      ) completed`, [userId]),
    db.query(`
    SELECT m.module_id, m.title AS module_title, l.lesson_id, l.title AS lesson_title
    FROM modules m
    JOIN lessons l ON l.module_id = m.module_id
    LEFT JOIN user_lesson_progress ulp ON ulp.lesson_id = l.lesson_id AND ulp.user_id = ?
    WHERE m.is_published = 1 AND (ulp.progress_id IS NULL OR ulp.status <> 'completed')
    ORDER BY m.display_order ASC, l.display_order ASC, m.module_id ASC, l.lesson_id ASC
    LIMIT 1`, [userId]),
    db.query(`
      SELECT DISTINCT DATE(completed_at) AS completed_on
      FROM user_lesson_progress
      WHERE user_id = ? AND status = 'completed' AND completed_at IS NOT NULL
      ORDER BY completed_on DESC`, [userId]),
  ]);

  const summary = summaryRows[0];
  const totalLessons = Number(summary.total_lessons);
  const completedLessons = Number(summary.completed_lessons);
  const dateKey = (date) => {
    if (typeof date === "string") return date.slice(0, 10);
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  };
  const completedDays = new Set(completionDays.map(({ completed_on }) => dateKey(completed_on)));
  const currentDay = new Date();
  currentDay.setHours(0, 0, 0, 0);
  if (!completedDays.has(dateKey(currentDay))) {
    currentDay.setDate(currentDay.getDate() - 1);
  }
  let learningStreak = 0;
  while (completedDays.has(dateKey(currentDay))) {
    learningStreak += 1;
    currentDay.setDate(currentDay.getDate() - 1);
  }

  const nextLesson = nextRows[0] || null;
  return {
    total_modules: Number(summary.total_modules),
    total_lessons: totalLessons,
    completed_modules: Number(completedModuleRows[0].completed_modules),
    completed_lessons: completedLessons,
    overall_progress: totalLessons ? Math.round((completedLessons * 100) / totalLessons) : 0,
    next_lesson: nextLesson,
    continue_learning_url: nextLesson
      ? `/modules/${nextLesson.module_id}?lesson=${nextLesson.lesson_id}`
      : null,
    learning_streak: learningStreak,
  };
};
