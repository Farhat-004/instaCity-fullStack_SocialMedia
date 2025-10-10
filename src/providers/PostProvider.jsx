import { PostContext } from "../contexts";
import useGetPost from "../hooks/useGetPost";

export default function PostProvider({ children }) {
    const { post, refetchPost } = useGetPost();
    return <PostContext value={{ post, refetchPost }}>{children}</PostContext>;
}
