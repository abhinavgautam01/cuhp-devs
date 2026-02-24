import { cookies } from "next/headers";
import { apiFetch } from "./api";

/**
 * Server-side version of apiFetch that properly handles cookies
 * for authentication in Server Components.
 */
export async function serverApiFetch(endpoint: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");

    const headers = new Headers(options.headers);
    if (cookieHeader) {
        headers.set("Cookie", cookieHeader);
    }

    return apiFetch(endpoint, {
        ...options,
        headers,
    });
}