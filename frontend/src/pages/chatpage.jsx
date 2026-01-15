import { Link } from "react-router";
import Message from "../components/chat/Users";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import axios from "axios";

export default function ChatPage() {
    const { auth } = useAuth();
    const api = useAxios();
    const [loading, setLoading] = useState(false);
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const getFriends = async () => {
        setLoading(true);
        try {
            const response = await api.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users/me/friends`
            );
            if (response.status == 200) setFriends(response.data);
        } catch (error) {
            console.log(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users`
            );
            if (response.status == 200)
                setUsers(
                    response.data.filter((user) => user._id !== auth?.user?._id)
                );
        } catch (error) {
            console.log(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    const friendIds = new Set(friends.map((f) => f.friend._id));

    const usersNotInFriends = users.filter((u) => !friendIds.has(u._id));

    useEffect(() => {
        getFriends();
        getUsers();
    }, []);

    return (
        <div className="h-screen w-full bg-gray-100 p-4">
            {loading ? (
                <h2> Loading page</h2>
            ) : (
                <>
                    {friends.length > 0 && (
                        <div className="max-w-4xl mx-auto mb-3">
                            <h2 className="text-xl font-semibold ">
                                Your Friends
                            </h2>

                            <ul className="space-y-3 ">
                                {friends.map((user) => (
                                    <Link
                                        key={user.friend._id}
                                        to={`/chat-room/${user.roomId}`}
                                    >
                                        <Message
                                            user={user?.friend}
                                            roomId={user?.roomId}
                                            from="friends"
                                        />
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                    {usersNotInFriends.length > 0 && (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-xl font-semibold ">Users</h2>

                            <ul className="space-y-3">
                                {usersNotInFriends.map((user) => (
                                    <Message user={user} from="users" />
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
