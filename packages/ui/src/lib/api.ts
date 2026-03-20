const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type ApiErrorPayload = {
    message?: string;
    errors?: Record<string, string[] | undefined>;
    code?: string;
};

function buildApiErrorMessage(errorData: ApiErrorPayload, status: number) {
    const baseMessage = errorData?.message || `API request failed with status ${status}`;
    const fieldErrors = errorData?.errors;

    if (fieldErrors && typeof fieldErrors === "object") {
        for (const key of Object.keys(fieldErrors)) {
            const value = fieldErrors[key];
            if (Array.isArray(value) && value.length > 0) {
                return `${baseMessage}: ${value[0]}`;
            }
        }
    }

    return baseMessage;
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${API_URL}${normalizedEndpoint}`;
    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type") && options.body !== undefined) {
        headers.set("Content-Type", "application/json");
    }

    const defaultOptions: RequestInit = {
        ...options,
        credentials: "include",
        headers,
    };

    let response: Response;
    try {
        response = await fetch(url, defaultOptions);
    } catch (error) {
        throw new Error(`Network request failed for ${url}. Check backend availability and CORS settings.`);
    }

    if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as ApiErrorPayload;

        // Auto-logout on session expiration or missing token
        if (response.status === 401) {
            if (typeof window !== "undefined") {
                // Clear persistent auth state to prevent redirect loops
                localStorage.removeItem("auth-storage");
                
                // Only redirect if not already on sign-in page
                if (!window.location.pathname.includes("/signin")) {
                    window.location.href = "/signin";
                }
            }
        }

        throw new Error(buildApiErrorMessage(errorData, response.status));
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}
