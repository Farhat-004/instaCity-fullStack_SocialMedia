import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { Bounce, toast } from "react-toastify";

export default function Message({ user, from, roomId }) {
    const { auth } = useAuth();
    const api = useAxios();
    const [loading, setLoading] = useState(false);
    const handleAddFriend = async () => {
        setLoading(true);
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users/me/friends`,
                {
                    userId: user._id,
                    roomId: user?._id + "_" + auth?.user?._id,
                }
            );
            if (response.status == 200) {
                console.log(response?.data?.friends);

                toast.success(
                    "User added to your friend list. please refetch the page",
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    }
                );
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    return (
        <li
            key={user.id}
            className="flex items-center justify-between gap-4 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition mb-1"
        >
            {/* User info */}
            <div className="flex items-center gap-3">
                {user.avatar ? (
                    <img
                        src={user?.avatar}
                        className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold"
                    />
                ) : (
                    <p className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                        {user?.name.charAt(0)}
                    </p>
                )}

                <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {from == "users" ? (
                    <button
                        disabled={loading}
                        onClick={handleAddFriend}
                        className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition whitespace-nowrap"
                    >
                        Add Friend
                    </button>
                ) : (
                    <button className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition whitespace-nowrap">
                        Message
                    </button>
                )}
            </div>
        </li>
    );
}
