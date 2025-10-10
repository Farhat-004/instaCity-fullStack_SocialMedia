import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useProfile() {
    const api = useAxios();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users/me`
            );
            if (response?.status === 200) {
                setUser(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { user, loading, error, refetch: fetchUserData };
}
