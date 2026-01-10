import { Link } from "react-router";

export default function PostLikesList({ postLikes, onClose }) {
    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
                <div className="flex gap-40 flex-row ">
                    <h2 className="text-xl font-bold mb-4">Post Likes</h2>
                    <button
                        onClick={() => onClose()}
                        className="text-sm   text-red-400 font-bold mb-4"
                    >
                        close
                    </button>
                </div>
                <ul className="flex flex-col gap-4">
                    {postLikes?.map((like) => (
                        <Link
                            key={like._id}
                            to={`/profile-page/${like._id}`}
                            className="flex flex-row gap-3 items-center"
                        >
                            <img
                                src={`${import.meta.env.VITE_SERVER_URL}/${
                                    like?.avatar
                                }`}
                                alt="user avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <p className="text-gray-900 font-medium">
                                {like?.name}
                            </p>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}
