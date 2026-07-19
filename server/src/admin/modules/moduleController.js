import {
  createModule,
  deleteModule,
  getAllModules,
  getDashboardSummary,
  getModuleById,
  getModuleLessonCount,
  updateModule,
} from "./moduleModels.js";

const parseId = (value) => {
  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
};

const validateModule = (module) => {
  const title = String(module?.title ?? "").trim();
  const description = String(module?.description ?? "").trim();
  const displayOrder = Number(module?.display_order);
  const estimatedMinutes = module?.estimated_minutes;
  const difficulty = module?.difficulty || null;
  const isPublished = module?.is_published;

  if (!title) {
    return {
      error: "Title is required",
    };
  }

  if (!Number.isInteger(displayOrder) || displayOrder < 0) {
    return {
      error: "Display order must be a non-negative integer",
    };
  }

  if (
    estimatedMinutes !== null &&
    estimatedMinutes !== undefined &&
    estimatedMinutes !== "" &&
    (
      !Number.isInteger(Number(estimatedMinutes)) ||
      Number(estimatedMinutes) < 0
    )
  ) {
    return {
      error: "Estimated minutes must be a non-negative integer",
    };
  }

  if (
    difficulty &&
    !["Beginner", "Intermediate", "Advanced"].includes(difficulty)
  ) {
    return {
      error: "Difficulty must be Beginner, Intermediate, or Advanced",
    };
  }

  if (
    typeof isPublished !== "boolean" &&
    isPublished !== 0 &&
    isPublished !== 1
  ) {
    return {
      error: "Published status must be true or false",
    };
  }

  return {
    value: {
      title,
      description: description || null,
      difficulty,
      estimated_minutes:
        estimatedMinutes === null ||
        estimatedMinutes === undefined ||
        estimatedMinutes === ""
          ? null
          : Number(estimatedMinutes),
      display_order: displayOrder,
      is_published: isPublished === true || isPublished === 1,
    },
  };
};

/*
|--------------------------------------------------------------------------
| Admin module controllers
|--------------------------------------------------------------------------
*/

export const getModules = async (_req, res) => {
  try {
    const modules = await getAllModules();

    return res.json(modules);
  } catch (err) {
    console.error("Get modules error:", err);

    return res.status(500).json({
      message: "Failed to load modules",
    });
  }
};

export const getModule = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);

    if (!moduleId) {
      return res.status(400).json({
        message: "Invalid module ID",
      });
    }

    const moduleData = await getModuleById(moduleId);

    if (!moduleData) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    return res.json(moduleData);
  } catch (err) {
    console.error("Get module error:", err);

    return res.status(500).json({
      message: "Failed to load module",
    });
  }
};

export const addModule = async (req, res) => {
  try {
    const validation = validateModule(req.body);

    if (validation.error) {
      return res.status(400).json({
        message: validation.error,
      });
    }

    const moduleId = await createModule(validation.value);

    return res.status(201).json({
      message: "Module created successfully",
      module_id: moduleId,
    });
  } catch (err) {
    console.error("Create module error:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "A module already uses this display order",
      });
    }

    return res.status(500).json({
      message: "Failed to create module",
    });
  }
};

export const editModule = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);

    if (!moduleId) {
      return res.status(400).json({
        message: "Invalid module ID",
      });
    }

    const validation = validateModule(req.body);

    if (validation.error) {
      return res.status(400).json({
        message: validation.error,
      });
    }

    const existingModule = await getModuleById(moduleId);

    if (!existingModule) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    const result = await updateModule(
      moduleId,
      validation.value
    );

    if (!result.affectedRows) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    return res.json({
      message: "Module updated successfully",
    });
  } catch (err) {
    console.error("Update module error:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "A module already uses this display order",
      });
    }

    return res.status(500).json({
      message: "Failed to update module",
    });
  }
};

export const removeModule = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);

    if (!moduleId) {
      return res.status(400).json({
        message: "Invalid module ID",
      });
    }

    const existingModule = await getModuleById(moduleId);

    if (!existingModule) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    const lessonCount = await getModuleLessonCount(moduleId);

    if (lessonCount > 0) {
      return res.status(409).json({
        message: "Remove this module's lessons before deleting it",
      });
    }

    const result = await deleteModule(moduleId);

    if (!result.affectedRows) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    return res.json({
      message: "Module deleted successfully",
    });
  } catch (err) {
    console.error("Delete module error:", err);

    return res.status(500).json({
      message: "Failed to delete module",
    });
  }
};

export const getAdminDashboardSummary = async (_req, res) => {
  try {
    const summary = await getDashboardSummary();

    return res.json(summary);
  } catch (err) {
    console.error("Admin dashboard error:", err);

    return res.status(500).json({
      message: "Failed to load dashboard data",
    });
  }
};

