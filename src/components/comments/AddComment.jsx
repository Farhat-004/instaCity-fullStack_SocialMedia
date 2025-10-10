import { useContext, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { PostContext } from "../../contexts";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router";

export default function AddComment({ postId }) {
    const { auth } = useAuth();
    const [comment, setComment] = useState("");
    const { refetchPost, setActions } = useContext(PostContext);
    const api = useAxios();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddComment();
        }
    };

    const handleAddComment = async () => {
        if (auth?.user?.name && comment) {
            try {
                const response = await api.post(
                    `${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/posts/${postId}/comment`,
                    { text: comment }
                );
                if (response.status === 201) {
                    setComment("");
                    refetchPost();
                    setActions((prev) => ({
                        ...prev,
                        commentsCountSate: prev.commentsCountSate + 1,
                    }));
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            toast.warn("You need to login to comment", {
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
    return (
        <div className="px-3 mt-2 flex justify-between h-7  items-center">
            <input
                type="text"
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Add a comment..."
                className="text-sm w-full outline-none"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleAddComment}
                className="h-6 w-6 stroke-zinc-600 lucide lucide-send-horizontal-icon lucide-send-horizontal"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                <path d="M6 12h16" />
            </svg>
        </div>
    );
}
