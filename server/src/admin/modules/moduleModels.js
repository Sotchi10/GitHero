import { db } from "../../config/db.js";

export const getAllModules = async () => {
  const [rows] = await db.query(`
    SELECT *
    FROM modules
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

export const createModule = async (module) => {
  const {
    title,
    description,
    difficulty,
    estimated_minutes,
    total_lessons,
    thumbnail,
    display_order,
    pdf_url,
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
      thumbnail,
      display_order,
      pdf_url
    )
    VALUES (?,?,?,?,?,?,?,?)
    `,
    [
      title,
      description,
      difficulty,
      estimated_minutes,
      total_lessons,
      thumbnail,
      display_order,
      pdf_url,
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
    total_lessons,
    thumbnail,
    display_order,
    pdf_url,
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
      total_lessons=?,
      thumbnail=?,
      display_order=?,
      pdf_url=?,
      is_published=?
    WHERE module_id=?
    `,
    [
      title,
      description,
      difficulty,
      estimated_minutes,
      total_lessons,
      thumbnail,
      display_order,
      pdf_url,
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