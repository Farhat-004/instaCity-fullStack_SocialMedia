import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetUser(id) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [postsCount, setPostCount] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/user/${id}`
            );
            if (response?.status === 200) {
                let { user, posts, postsCount } = response.data;
                setUser(user);
                setPosts(posts);
                setPostCount(postsCount);
            }
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { user, loading, posts, postsCount };
}
