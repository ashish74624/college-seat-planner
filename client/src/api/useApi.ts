import { useState } from "react";

export function useApi() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const callApi = async <T,>(
        apiCall: () => Promise<T>
    ): Promise<T | null> => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiCall();
            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { callApi, loading, error };
}
