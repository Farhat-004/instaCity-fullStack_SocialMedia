import { Link } from "react-router";
import AddComment from "../comments/AddComment";

export default function PostCommentSection({ commentsCount, postId }) {
    return (
        <>
            <div className="px-3 mt-1">
                <Link to={`/post/${postId}`} className="text-gray-500 text-sm">
                    View all {commentsCount} comments
                </Link>
            </div>

            <AddComment postId={postId} />
        </>
    );
}
