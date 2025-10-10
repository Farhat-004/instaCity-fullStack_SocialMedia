import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

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
            console.log(err.response?.data?.message || err.message);
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
                            src={`${import.meta.env.VITE_SERVER_URL}/${
                                p.image
                            }`}
                            alt="Grid image"
                            className="w-full grid-image"
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}
