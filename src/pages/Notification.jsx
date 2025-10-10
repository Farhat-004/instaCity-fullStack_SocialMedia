import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import SingleNotification from "../components/SingleNotification";
import { Link } from "react-router";
export default function Notification() {
    const { auth } = useAuth();
    const api = useAxios();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        setLoading(true);

        try {
            const response = await api.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/notifications`
            );
            if (response?.status === 200) {
                setNotifications(response.data);
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (auth?.user?._id) fetchNotifications();
    }, []);
    return (
        <div className="notifications-container">
            {/* <!-- Header --> */}
            <header className="sticky top-0 bg-white  z-10">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-lg font-semibold">Notifications</h1>
                </div>
            </header>

            {auth?.user?._id ? (
                <div className="notifications-list">
                    {loading && (
                        <p className="text-2xl">Loading notifications.....</p>
                    )}
                    {notifications.length == 0 && !loading && (
                        <p>You don't have any notification</p>
                    )}
                    {notifications?.map((n) => (
                        <SingleNotification n={n} />
                    ))}

                    <div className="h-20"></div>
                </div>
            ) : (
                <div className="mt-40">
                    <h1 className="text-3xl">
                        Login to see your notifications
                    </h1>
                    <Link className="m-40 mt-10 text-blue-950" to="/login">
                        Click to login
                    </Link>
                </div>
            )}
        </div>
    );
}
