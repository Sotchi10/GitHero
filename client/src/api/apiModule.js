import API from "./axios";


export const getModules = () =>
    API.get("/api/modules");
export const getUserDashboardSummary = () => API.get("/api/modules/dashboard-summary");


export const getModuleById = (id) =>
    API.get(`/api/modules/${id}`);

export const getModuleLessons = (id) => API.get(`/api/modules/${id}/lessons`);
export const openLesson = (id) => API.post(`/api/modules/lessons/${id}/open`);
export const completeLesson = (id) => API.post(`/api/modules/lessons/${id}/complete`);

export const getAdminModules = () => API.get("/api/admin/modules");
export const getAdminDashboardSummary = () =>
  API.get("/api/admin/modules/dashboard-summary");
export const createModule = (data) => API.post("/api/admin/modules", data);
export const updateModule = (id, data) => API.put(`/api/admin/modules/${id}`, data);
export const deleteModule = (id) => API.delete(`/api/admin/modules/${id}`);

export const getLessons = () => API.get("/api/lessons");
export const getLessonById = (id) => API.get(`/api/lessons/${id}`);
export const createLesson = (data) => API.post("/api/lessons", data);
export const updateLesson = (id, data) => API.put(`/api/lessons/${id}`, data);
export const deleteLesson = (id) => API.delete(`/api/lessons/${id}`);
export const uploadLessonPdf = (id, file) => {
  const data = new FormData();
  data.append("pdf", file);
  return API.post(`/api/lessons/${id}/pdf`, data);
};
export const removeLessonPdf = (id) => API.delete(`/api/lessons/${id}/pdf`);



