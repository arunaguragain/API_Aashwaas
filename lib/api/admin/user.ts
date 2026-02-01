import { API } from "../endpoints";
import axios from "../axios";

export const getUsers = async () => {
    try {
        const response = await axios.get(API.ADMIN.USER.CREATE);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch users');
    }
}

export const getUserById = async (id: string) => {
    try {
        const response = await axios.get(`${API.ADMIN.USER.CREATE}${id}`);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch user');
    }
}

export const createUser = async (userData: any) => {
    try {
        const response = await axios.post(
            API.ADMIN.USER.CREATE,
            userData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // for file upload/multer
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Create user failed');
    }
}

export const updateUser = async (id: string, userData: any) => {
    try {
        const response = await axios.put(
            `${API.ADMIN.USER.CREATE}${id}`,
            userData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // for file upload/multer
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Update user failed');
    }
}

export const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(`${API.ADMIN.USER.CREATE}${id}`);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete user failed');
    }
}