import { Link } from "react-router";
import useGetPost from "../hooks/useGetPost";
import { getDateDifferenceFromNow } from "../utils/getTime";

export default function SingleNotification({ n }) {
    const { post } = useGetPost(n?.postId);
    return (
        <div
            key={n._id}
            className="notification-item flex items-center p-4 border-b border-gray-100"
        >
            <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden mr-3">
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL}/${
                            n?.fromUser?.avatar
                        }`}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="flex-1 mr-3">
                <p className="text-sm">
                    <Link
                        to={`/profile-page/${n?.fromUserId}`}
                        className="font-semibold"
                    >
                        {n?.fromUser?.name}
                    </Link>{" "}
                    {n?.type == "like" ? "liked" : "commented on"} your post.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {getDateDifferenceFromNow(n?.createdAt)}
                </p>
            </div>

            {post?.image ? (
                <div className="w-11 h-11 rounded overflow-hidden">
                    <Link to={`/post/${n?.postId}`}>
                        <img
                            src={`${import.meta.env.VITE_SERVER_URL}/${
                                post?.image
                            }`}
                            alt="Post thumbnail"
                            className="post-thumbnail"
                        />
                    </Link>
                </div>
            ) : (
                <p className="text-sm text-red-400">Post is not available</p>
            )}
        </div>
    );
}
