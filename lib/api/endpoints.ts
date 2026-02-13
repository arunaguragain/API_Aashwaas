export const API = {
    // Authentication / public auth routes
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        WHOAMI: "/api/auth/whoami",
        UPDATEPROFILE: "/api/auth/update-profile",
        FORGOT_PASSWORD: "/api/auth/request-password-reset",
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
    },
    // Public NGO routes
    NGO: {
        LIST: "/api/ngos",
        GET: (id: string) => `/api/ngos/${id}`,
    },
    // Public Donation routes
    DONATION: {
        LIST: "/api/donations",
        GET: (id: string) => `/api/donations/${id}`,
        CREATE: "/api/donations",
    },
    // Public Task routes
    TASK: {
        LIST: "/api/tasks",
        GET: (id: string) => `/api/tasks/${id}`,
        ASSIGN: (id: string) => `/api/tasks/${id}/assign`,
        UPDATE_STATUS: (id: string) => `/api/tasks/${id}/status`,
    },
    // Admin routes 
    ADMIN: {
        USER: {
            GET_ALL: "/api/admin/users",
            GET_ONE: (id: string) => `/api/admin/users/${id}`,
            CREATE: "/api/admin/users",
            UPDATE: (id: string) => `/api/admin/users/${id}`,
            DELETE: (id: string) => `/api/admin/users/${id}`,
        },
        NGO: {
            GET_ALL: "/api/admin/ngos",
            GET_ONE: (id: string) => `/api/admin/ngos/${id}`,
            CREATE: "/api/admin/ngos",
            UPDATE: (id: string) => `/api/admin/ngos/${id}`,
            DELETE: (id: string) => `/api/admin/ngos/${id}`,
        },
        DONATION: {
            GET_ALL: "/api/admin/donations",
            GET_ONE: (id: string) => `/api/admin/donations/${id}`,
            UPDATE: (id: string) => `/api/admin/donations/${id}`,
            DELETE: (id: string) => `/api/admin/donations/${id}`,
            APPROVE: (id: string) => `/api/admin/donations/${id}/approve`,
            ASSIGN: (id: string) => `/api/admin/donations/${id}/assign`,
        },
    },
};