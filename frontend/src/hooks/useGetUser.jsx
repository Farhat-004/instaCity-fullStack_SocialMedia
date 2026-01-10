import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

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
                let { user, posts } = response.data; //postCount
                setUser(user);
                setPosts(posts);
                setPostCount(posts.length);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { user, loading, posts, postsCount };
}
