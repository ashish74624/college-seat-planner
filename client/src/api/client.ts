import { API_BASE_URL } from "../lib/constants";


export async function apiRequest<T>(
    endpoint: string,
    method: string = "GET",
    body?: unknown
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data as T;
}
