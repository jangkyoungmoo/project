import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getItems = async (type = "clothes", params = {}) => {
    const res = await api.get(`/${type}`, { params });
    return res.data;
};

export const getItemById = async (type = "clothes", id) => {
    const res = await api.get(`/${type}/${id}`);
    return res.data;
};

export const createItem = async (type = "clothes", itemData) => {
    const res = await api.post(`/${type}`, itemData);
    return res.data;
};

export const updateItem = async (type = "clothes", id, itemData) => {
    const res = await api.put(`/${type}/${id}`, itemData);
    return res.data;
};

export const patchItem = async (type = "clothes", id, partialData) => {
    const res = await api.patch(`/${type}/${id}`, partialData);
    return res.data;
};

export const deleteItem = async (type = "clothes", id) => {
    const res = await api.delete(`/${type}/${id}`);
    return res.data;
}