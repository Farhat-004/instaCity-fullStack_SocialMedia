import PostsList from "../components/posts/PostList";

export default function HomePage() {
    return (
        <div className="max-w-6xl mx-auto w-full py-10  ">
            <div style={{ height: "100vh" }}>
                <PostsList />
            </div>
        </div>
    );
}
