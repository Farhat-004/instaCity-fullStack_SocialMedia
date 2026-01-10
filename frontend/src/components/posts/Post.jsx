import { useState } from "react";
import { PostContext } from "../../contexts";
import useGetPost from "../../hooks/useGetPost";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import PostCommentSection from "./PostCommentSection";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostLikes from "./PostLikes";
import PostLikesList from "./PostLikesList";

export default function Post({ post }) {
    const { refetchPost } = useGetPost(post?._id);
    const [actions, setActions] = useState({
        likeCountSate: post.likesCount,
        commentsCountSate: post.commentsCount,
    });
    const [showList, setShowList] = useState(false);
    return (
        <article className="border-b pb-4 mb-4 max-w-[560px] mx-auto border rounded-md">
            <PostHeader post={post} />

            <PostImage image={post.image} postId={post._id} />

            <PostActions
                postId={post?._id}
                likes={post?.likes}
                likesCountUpdater={setActions}
                refetchPost={refetchPost}
            />

            {showList && (
                <PostLikesList //opens a modal, contains list of likes and the users
                    postLikes={post?.likes}
                    onClose={() => setShowList(false)}
                />
            )}

            <PostLikes
                likes={post?.likes}
                likesCount={actions?.likeCountSate}
                refetchPost={refetchPost}
                onListClick={() => setShowList(true)}
            />

            <PostCaption caption={post.caption} />

            <PostContext value={{ refetchPost, setActions }}>
                <PostCommentSection
                    commentsCount={actions.commentsCountSate}
                    postId={post._id}
                />
            </PostContext>
        </article>
    );
}
