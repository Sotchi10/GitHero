import API from "./axios";


export const getModules = () =>
    API.get("/api/modules");


export const getModuleById = (id) =>
    API.get(`/api/modules/${id}`);



