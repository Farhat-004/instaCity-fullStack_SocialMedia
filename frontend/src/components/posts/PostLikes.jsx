export default function PostLikes({ likes, likesCount, onListClick }) {
    return (
        <div className="px-3">
            <div onClick={() => onListClick()} className="flex items-center">
                {likesCount > 0 && (
                    <div className="h-6 flex -space-x-2">
                        {likes?.map((like) => (
                            <img
                                key={like._id}
                                src={`${import.meta.env.VITE_SERVER_URL}/${
                                    like?.avatar
                                }`}
                                alt="User avatar"
                                className="w-6 h-6 rounded-full"
                            />
                        ))}
                    </div>
                )}
                <p className="text-sm ml-2">
                    <span className="font-semibold">{likesCount} likes</span>
                </p>
            </div>
        </div>
    );
}
