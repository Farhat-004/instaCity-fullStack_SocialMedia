import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetPost(id) {
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${id}`
            );
            if (response?.status === 200) {
                setPost(response.data);
            }
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    };

    useEffect(() => {
        if (id) fetchPost();
    }, [id]);

    return { post, refetchPost: fetchPost };
}
