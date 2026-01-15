import useAuth from "../../hooks/useAuth";
import { getDateDifferenceFromNow } from "../../utils/getTime";

export default function SingleMessage({ msg }) {
    const { auth } = useAuth();
    return (
        <div
            className={`flex ${
                msg.senderId === auth?.user?._id
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div
                className={`max-w-[75%] rounded-lg px-4 py-2 text-sm ${
                    msg.sender === auth?.user?.name
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800 border"
                }`}
            >
                <p>{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-70 text-left">
                    {getDateDifferenceFromNow(msg.time)}
                </p>
            </div>
        </div>
    );
}
