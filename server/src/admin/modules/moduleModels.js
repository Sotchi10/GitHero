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
  const [moduleCounts, lessonCounts, userCounts] = await Promise.all([
    db.query("SELECT COUNT(*) AS total FROM modules"),
    db.query("SELECT COUNT(*) AS total FROM lessons"),
    db.query("SELECT COUNT(*) AS total FROM users"),
  ]);
  return { modules: moduleCounts[0][0], lessons: lessonCounts[0][0], users: userCounts[0][0] };
};
