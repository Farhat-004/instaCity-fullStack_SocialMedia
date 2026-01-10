import { Link } from "react-router";

export default function PostImage({ image, postId }) {
    //need to handle this for details page
    return (
        <div className="relative">
            <Link to={`/post/${postId}`}>
                <img
                    src={image}
                    alt="Post image"
                    className="w-full object-cover max-h-[1000px]"
                />
            </Link>
        </div>
    );
}
