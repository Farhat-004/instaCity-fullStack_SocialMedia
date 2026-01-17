import { useEffect, useRef, useState } from "react";
import SingleMessage from "../components/chat/message.jsx";
import { io } from "socket.io-client";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const socket = io(import.meta.env.VITE_BACKEND_URL);
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

export default function ChatRoomPage() {
    const params = useParams();
    const { auth } = useAuth();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState(null);
    const cursorRef = useRef(null);
    const roomIdArray = params.roomId.split("_");
    const receiverId = roomIdArray.filter((id) => id !== auth?.user?._id)[0];
    const getReceiver = async () => {
        try {
            const receiverInfo = await axios.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users/${receiverId}`,
            );
            if (receiverInfo.status == 200) setReceiver(receiverInfo.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    useEffect(() => {
        socket.on("connect", () => {
            console.log("socket id", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.log("Socket connection error:", err.message);
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
        };
    }, []);
    useEffect(() => {
        getReceiver();
        socket.emit("join_room", params.roomId);
        socket.on("receive_message", (data) => {
            if (data.senderId === auth.user._id) return;
            setMessages((prev) => [...prev, data]);
        });

        cursorRef.current?.scrollIntoView({
            behavior: "smooth",
        });
        return () => {
            socket.off("receive_message");
        };
    }, [params.roomId]);

    const handleSendMsg = async () => {
        if (!message.trim()) return;
        const msgData = {
            id: messages[messages.length - 1].id + 1 || 0,
            roomId: params.roomId,
            sender: auth?.user?.name,
            senderId: auth?.user?._id,
            text: message,
            time: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, msgData]);
        socket.emit("send_message", msgData);
        setMessage("");
    };

    return (
        <div className="h-[80vh] w-full bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
                {receiver?.avatar ?
                    <img
                        src={receiver?.avatar}
                        alt="avatar"
                        className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold"
                    />
                :   <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                        {receiver?.name.charAt(0)}
                    </div>
                }
                <div>
                    <p className="font-medium text-gray-800">
                        {receiver?.name}
                    </p>
                    {/* <p className="text-xs text-gray-500">Online</p> */}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages?.map((msg) => (
                    <SingleMessage key={msg.id} msg={msg} />
                ))}
                <div ref={cursorRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t px-4 py-3">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        placeholder="Type a message..."
                        className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendMsg}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
