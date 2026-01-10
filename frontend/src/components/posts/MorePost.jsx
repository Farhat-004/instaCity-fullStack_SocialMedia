import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Bounce, toast } from "react-toastify";

export default function MorePosts({ userId }) {
    const [usersPosts, setUsersPosts] = useState([]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/user/${userId}`
            );
            if (response?.status === 200) {
                let { posts } = response.data;
                setUsersPosts(posts);
            }
        } catch (err) {
            toast.error(err?.response?.data?.message, {
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
        fetchUserData();
    }, [userId]);

    return (
        <div className="grid grid-cols-3 gap-1">
            {usersPosts?.map((p) => (
                <Link key={p._id} to={`/post/${p._id}`}>
                    <div className="relative">
                        <img
                            src={p.image}
                            alt="Grid image"
                            className="w-full grid-image"
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}
