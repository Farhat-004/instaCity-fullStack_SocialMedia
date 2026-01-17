import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useGetPost from "../../hooks/useGetPost";
import { useParams } from "react-router";
import { Bounce, toast } from "react-toastify";

export default function PostActions({
    postId,
    refetchPost,
    likes,
    likesCountUpdater,
}) {
    const { auth } = useAuth();
    const { post } = useGetPost(postId);
    const api = useAxios();
    const params = useParams();
    const [hasLiked, setHasLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (likes && auth?.user?._id) {
            setHasLiked(likes.some((like) => like._id === auth.user._id));
        }
    }, [likes, post, auth?.user?._id]);

    const handleLikeBtn = async () => {
        setLoading(true);
        if (auth?.user) {
            try {
                const response = await api.post(
                    `${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/posts/${postId}/like`
                );

                if (response?.status == 200) {
                    setHasLiked((prev) => !prev);
                    refetchPost();

                    likesCountUpdater((prev) => ({
                        ...prev,
                        likeCountSate: hasLiked
                            ? prev.likeCountSate - 1
                            : prev.likeCountSate + 1,
                    }));
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
        } else {
            toast.warn("You need to login to like a post", {
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

    const handleShareBtn = async () => {
        const url = `${window.location.href}${
            params?.postId ? "" : "post/" + postId
        }`;
        await navigator.clipboard.writeText(url);
        toast.success("Post link copied in clipboard");
    };

    return (
        <div className="flex justify-between p-3">
            <div className="flex space-x-4">
                <button
                    key={postId}
                    onClick={handleLikeBtn}
                    className="like-button"
                    disabled={loading}
                >
                    {hasLiked ? <Liked /> : <Unlike />}
                </button>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 stroke-zinc-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </button>
            </div>

            <button onClick={handleShareBtn}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-zinc-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
            </button>
        </div>
    );
}

function Unlike() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-zinc-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    );
}
function Liked() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-red-600"
            fill="red"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    );
}
