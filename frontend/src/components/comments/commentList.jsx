import Comment from "./comment";
import { useContext } from "react";
import { PostContext } from "../../contexts";

export default function CommentList({ postId }) {
    const { post } = useContext(PostContext);
    return (
        <div className="comments-section flex-grow p-3 border-amber-100 border-b">
            {/* <!-- Post Owner Comment --> */}
            <h3 className="font-bold pb-4">Comments</h3>

            {post?.commentsCount > 0 ? (
                post?.comments?.map((comment) => (
                    <Comment
                        postId={postId}
                        // refetchPost={refetchPost}
                        key={comment._id}
                        comment={comment}
                    />
                ))
            ) : (
                <h3 className="pb-4 ">No comments</h3>
            )}
        </div>
    );
}
