import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

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
        } catch (error) {
            toast.error(`From useGetPost ${error?.response?.data?.message}`, {
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
        }
    };

    useEffect(() => {
        if (id) fetchPost();
    }, [id]);

    return { post, refetchPost: fetchPost };
}
