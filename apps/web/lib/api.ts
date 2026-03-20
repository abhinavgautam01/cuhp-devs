const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001")
    .trim()
    .replace(/\/+$/, "");

type ApiErrorPayload = {
    message?: string;
    errors?: Record<string, string[] | undefined>;
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

    if (!headers.has("Content-Type") && options.body !== undefined && !(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }

    const defaultOptions: RequestInit = {
        ...options,
        headers,
        // Important for sending cookies to the backend
        credentials: "include",
    };

    let response: Response;
    try {
        response = await fetch(url, defaultOptions);
    } catch (error) {
        throw new Error(`Network request failed for ${url}. Check backend availability and CORS settings.`);
    }

    if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as ApiErrorPayload;
        const error = new Error(buildApiErrorMessage(errorData, response.status)) as any;
        error.status = response.status;
        error.errorData = errorData;
        throw error;
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}