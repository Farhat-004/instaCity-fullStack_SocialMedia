import { useState } from "react";
import { getDateDifferenceFromNow } from "../../utils/getTime";
import { Link } from "react-router";
import ThreeDots from "../../assets/3dots.svg";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { Bounce, toast } from "react-toastify";
// import useAvatar from "../../hooks/useAvatar";

export default function PostHeader({ post }) {
    const { auth } = useAuth();
    const api = useAxios();
    // const { avatarURL } = useAvatar(post?.user?.avatar);
    const [showOptions, setShowOptions] = useState(false);

    const isMe = post?.author?._id == auth?.user?._id;

    const handleDeletePost = async (postsId) => {
        try {
            const response = await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${postsId}`
            );
            if (response.status == 200) {
                toast.success(
                    "Post deleted successfully. Refresh the page to see updated posts.",
                    {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    }
                );
                showOptions(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-right",
                autoClose: 2000,
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
        <div className="flex items-center justify-between p-3">
            <div className="flex items-center">
                <Link
                    to={`/profile-page/${post?.author?._id}`}
                    className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
                >
                    <img
                        src={post?.author?.avatar}
                        className="w-full h-full object-cover"
                        alt="User avatar"
                    />
                </Link>

                <div className="ml-2 flex flex-col">
                    <Link
                        to={`/profile-page/${post?.author?._id}`}
                        className="font-semibold text-sm leading-tight hover:underline"
                    >
                        {post?.name || post?.author?.name}
                    </Link>

                    <span className="text-gray-500 text-xs ">
                        • posted {getDateDifferenceFromNow(post?.createdAt)}
                    </span>
                </div>
            </div>

            {isMe && (
                <div className="relative ml-24">
                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <img
                            src={ThreeDots}
                            alt="Actions"
                            className="w-5 h-5"
                        />
                    </button>

                    {showOptions && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                            <Link
                                to={`/edit-post/${post?._id}`}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <img
                                    src={Edit}
                                    alt="Edit"
                                    className="w-4 h-4 mr-2"
                                />
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDeletePost(post?._id)}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                            >
                                <img
                                    src={Delete}
                                    alt="Delete"
                                    className="w-4 h-4 mr-2"
                                />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
