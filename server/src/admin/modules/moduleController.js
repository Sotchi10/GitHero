import { createModule, deleteModule, getAllModules, getAvailableModuleById, getAvailableModules as findAvailableModules, getDashboardSummary, getLessonsByModuleId, getModuleById, getModuleLessonCount, updateModule } from "./moduleModels.js";

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const validateModule = (module) => {
  const title = String(module?.title || "").trim();
  const displayOrder = Number(module?.display_order);
  const estimatedMinutes = module?.estimated_minutes;
  const difficulty = module?.difficulty || null;
  const isPublished = module?.is_published;

  if (!title) return { error: "Title is required" };
  if (!Number.isInteger(displayOrder) || displayOrder < 0) {
    return { error: "Display order must be a non-negative integer" };
  }
  if (
    estimatedMinutes !== null &&
    estimatedMinutes !== undefined &&
    estimatedMinutes !== "" &&
    (!Number.isInteger(Number(estimatedMinutes)) || Number(estimatedMinutes) < 0)
  ) {
    return { error: "Estimated minutes must be a non-negative integer" };
  }
  if (difficulty && !["Beginner", "Intermediate", "Advanced"].includes(difficulty)) {
    return { error: "Difficulty must be Beginner, Intermediate, or Advanced" };
  }
  if (typeof isPublished !== "boolean" && isPublished !== 0 && isPublished !== 1) {
    return { error: "Published status must be true or false" };
  }

  return {
    value: {
      title,
      description: module?.description?.trim() || null,
      difficulty,
      estimated_minutes:
        estimatedMinutes === null || estimatedMinutes === undefined || estimatedMinutes === ""
          ? null
          : Number(estimatedMinutes),
      display_order: displayOrder,
      is_published: isPublished === true || isPublished === 1,
    },
  };
};

export const getModules = async (req, res) => {
  try {
    const modules = await getAllModules();

    res.json(modules);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load modules",
    });
  }
};

export const getModule = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);
    if (!moduleId) return res.status(400).json({ message: "Invalid module ID" });

    const module = await getModuleById(moduleId);

    if (!module) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    res.json(module);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addModule = async (req, res) => {
  try {
    const validation = validateModule(req.body);
    if (validation.error) return res.status(400).json({ message: validation.error });

    const id = await createModule(validation.value);

    res.status(201).json({
      message: "Module created successfully",
      module_id: id,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: err.message });
  }
};

export const editModule = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);
    if (!moduleId) return res.status(400).json({ message: "Invalid module ID" });

    const validation = validateModule(req.body);
    if (validation.error) return res.status(400).json({ message: validation.error });

    if (!await getModuleById(moduleId)) {
      return res.status(404).json({ message: "Module not found" });
    }

    await updateModule(moduleId, validation.value);

    res.json({
      message: "Module updated",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update module",
    });
  }
};

export const removeModule = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);
    if (!moduleId) return res.status(400).json({ message: "Invalid module ID" });

    if (!await getModuleById(moduleId)) {
      return res.status(404).json({ message: "Module not found" });
    }

    if (await getModuleLessonCount(moduleId)) {
      return res.status(409).json({ message: "Remove this module's lessons before deleting it" });
    }

    await deleteModule(moduleId);

    res.json({
      message: "Module deleted",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete module",
    });
  }
};

export const getAdminDashboardSummary = async (_req, res) => {
  try {
    res.json(await getDashboardSummary());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

export const getAvailableModules = async (_req, res) => {
  try {
    res.json(await findAvailableModules());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load modules" });
  }
};

export const getAvailableModule = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);
    if (!moduleId) return res.status(400).json({ message: "Invalid module ID" });
    const module = await getAvailableModuleById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json(module);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load module" });
  }
};

export const getAvailableModuleLessons = async (req, res) => {
  try {
    const moduleId = parseId(req.params.id);
    if (!moduleId) return res.status(400).json({ message: "Invalid module ID" });
    if (!await getAvailableModuleById(moduleId)) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(await getLessonsByModuleId(moduleId));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load lessons" });
  }
};
