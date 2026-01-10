import { Link, useParams } from "react-router";
import PostActions from "../components/posts/PostActions";
import PostCaption from "../components/posts/PostCaption";
import PostHeader from "../components/posts/PostHeader";
import PostImage from "../components/posts/PostImage";
import CommentList from "../components/comments/commentList";
import MorePosts from "../components/posts/MorePost";
import AddComment from "../components/comments/AddComment";
import useGetPost from "../hooks/useGetPost";
import { PostContext } from "../contexts";
import { getDateDifferenceFromNow } from "../utils/getTime";
import { useEffect, useState } from "react";

export default function PostDetails() {
    const params = useParams();

    const { post, refetchPost } = useGetPost(params?.postId);
    const [actions, setActions] = useState({
        likeCountSate: post?.likesCount ?? 0,
        commentsCountSate: post?.commentsCount ?? 0,
    });
    useEffect(() => {
        if (post?._id) {
            setActions({
                likeCountSate: post?.likesCount,
                commentsCountSate: post?.commentsCount,
            });
        }
    }, [params?.postId, post?._id, post?.commentsCount, post?.likesCount]);
    return (
        <PostContext value={{ post, refetchPost }}>
            <div className="max-w-6xl w-full p-3">
                <div className="bg-white border border-amber-100 rounded-sm overflow-hidden mb-8 mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 bg-black flex items-center">
                            <PostImage image={post?.image} />
                        </div>

                        <div className="w-full md:w-1/2 flex flex-col">
                            {/* <!-- Post Header --> */}
                            <div className="flex items-center border-amber-100 justify-between p-3 border-b">
                                <PostHeader post={post} />
                            </div>

                            <PostCaption caption={post?.caption} more={true} />
                            <CommentList postId={post?._id} />

                            {/* <!-- Post Actions --> */}
                            <div className="p-3 border-amber-100 border-b">
                                <PostActions
                                    postId={post?._id}
                                    likes={post?.likes}
                                    likesCountUpdater={setActions}
                                    refetchPost={refetchPost}
                                />

                                {/* <!-- Likes --> */}
                                <div className="mb-1">
                                    <p className="text-sm font-semibold">
                                        {actions.likeCountSate} likes
                                    </p>
                                </div>

                                {/* <!-- Post Time --> */}
                                <div className="mb-2">
                                    <p className="text-xs text-gray-500">
                                        {getDateDifferenceFromNow(
                                            post?.createdAt
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Add Comment --> */}
                            <AddComment postId={post?._id} />
                        </div>
                    </div>
                </div>

                {/* <!-- all Posts Section --> */}
                <div className="mb-8 mx-auto max-w-5xl">
                    <h2 className="text-sm text-gray-500 font-normal mb-4">
                        All posts from{"  "}
                        <span className="font-semibold text-black">
                            {post?.author?.name}
                        </span>
                    </h2>
                    <MorePosts userId={post?.author?._id} />
                </div>
            </div>
        </PostContext>
    );
}
