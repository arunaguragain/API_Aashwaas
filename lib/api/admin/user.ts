import { API } from "../endpoints";
import axios from "../axios";
import { getAuthToken } from "@/lib/cookie";

const buildAuthHeaders = async (extraHeaders?: Record<string, string>) => {
    const token = await getAuthToken();
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    return { ...authHeader, ...extraHeaders };
}

export const getUsers = async () => {
    try {
        const headers = await buildAuthHeaders();
        const response = await axios.get(API.ADMIN.USER.CREATE, { headers });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch users');
    }
}

export const getUserById = async (id: string) => {
    try {
        const headers = await buildAuthHeaders();
        const response = await axios.get(`${API.ADMIN.USER.CREATE}${id}`, { headers });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch user');
    }
}

export const createUser = async (userData: any) => {
    try {
        const headers = await buildAuthHeaders({
            'Content-Type': 'multipart/form-data',
        });
        const response = await axios.post(
            API.ADMIN.USER.CREATE,
            userData,
            {
                headers
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
        const headers = await buildAuthHeaders({
            'Content-Type': 'multipart/form-data',
        });
        const response = await axios.put(
            `${API.ADMIN.USER.CREATE}${id}`,
            userData,
            {
                headers
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
        const headers = await buildAuthHeaders();
        const response = await axios.delete(`${API.ADMIN.USER.CREATE}${id}`, { headers });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete user failed');
    }
}