import axios from 'axios';
import { getAuthToken } from '../cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5050';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getAuthToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        try {
            const method = (config.method || '').toString().toLowerCase();
            if (method === 'delete') {
                    const loc = typeof window !== 'undefined' ? window.location.pathname : 'server';
                    // Temporary debug log to help trace accidental deletes (includes stack trace)
                    // eslint-disable-next-line no-console
                    console.warn('[DEBUG] axios DELETE ->', config.url, 'from', loc, 'at', new Date().toISOString());
                    // eslint-disable-next-line no-console
                    try { console.trace('[DEBUG] axios DELETE stack trace'); } catch (e) { /* ignore */ }
                    // eslint-disable-next-line no-console
                    try { console.warn('[DEBUG] axios DELETE payload/data ->', (config as any).data); } catch (e) { /* ignore */ }
            }
        } catch (e) {
            // ignore logging errors
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;