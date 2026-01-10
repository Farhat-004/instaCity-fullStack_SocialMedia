import { useEffect, useState, useRef, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import Post from "./Post";
import axios from "axios";
import { toast } from "react-toastify";

export default function PostsList() {
    const { auth } = useAuth();
    const loaderRef = useRef(null);
    const toastShownRef = useRef(false);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const isLoggedIn = !!auth?.user?._id;
    const limit = isLoggedIn ? 10 : 3;

    const fetchPosts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/posts/?page=${page}&limit=${limit}`
            );

            if (res.status === 200) {
                const newPosts = res.data.posts || [];
                setHasMore(res.data.hasMore);

                setPosts((prev) => {
                    const ids = new Set(prev.map((p) => p._id));
                    const unique = newPosts.filter((p) => !ids.has(p._id));
                    return [...prev, ...unique];
                });

                if (!isLoggedIn) {
                    setHasMore(false);
                    return;
                }
            }
        } catch (err) {
            console.error("Post fetch failed:", err.message);
            toast.error("Failed to load posts.");
        } finally {
            setLoading(false);
        }
    }, [page, limit, hasMore, loading, isLoggedIn]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        const observer = new IntersectionObserver((items) => {
            const loaderItem = items[0];

            if (loaderItem.isIntersecting) {
                if (isLoggedIn && hasMore && !loading) {
                    setPage((prev) => prev + 1);
                } else if (!isLoggedIn && !toastShownRef.current) {
                    toast.info("Please log in to see all posts.", {
                        delay: 3000,
                    });
                    toastShownRef.current = true;
                }
            }
        });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [isLoggedIn, hasMore, loading]);

    // Reset feed when login/logout changes
    useEffect(() => {
        setPosts([]);
        setPage(1);
        setHasMore(true);
        toastShownRef.current = false;
    }, [isLoggedIn]);

    return (
        <div>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}

            {hasMore && (
                <div ref={loaderRef} className="text-center py-4 text-gray-500">
                    Loading more posts...
                </div>
            )}

            {!loading && posts.length === 0 && (
                <p className="text-center text-gray-400 py-6">
                    No posts found.
                </p>
            )}
        </div>
    );
}
