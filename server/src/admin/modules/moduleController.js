import {getAllModules, getModuleById, createModule, updateModule, deleteModule } from "./moduleModels.js";

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
    const module = await getModuleById(req.params.id);

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
    const id = await createModule(req.body);

    res.status(201).json({
      message: "Module created successfully",
      module_id: id,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create module",
    });
  }
};

export const editModule = async (req, res) => {
  try {
    await updateModule(req.params.id, req.body);

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
    await deleteModule(req.params.id);

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