import { useContext, useState } from "react";
// import useAvatar from "../../hooks/useAvatar";
// import useGetUser from "../../hooks/useGetUser";
import { getDateDifferenceFromNow } from "../../utils/getTime";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { PostContext } from "../../contexts";
import { Bounce, toast } from "react-toastify";

export default function Comment({ comment, postId }) {
    const { refetchPost } = useContext(PostContext);
    const { auth } = useAuth();
    const api = useAxios();
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(comment?.text);
    const showOptions = auth?.user?._id === comment?.author?._id;

    const handleDelete = async () => {
        try {
            const response = await api.delete(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/posts/${postId}/comment/${comment?._id}`
            );
            if (response.status === 200) {
                refetchPost();
                toast.success("comment deleted", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            toast.error(
                `${error?.response?.data?.message}. Failed to delete comment.`,
                {
                    position: "top-right",
                    autoClose: 2000,
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
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleEdit();
        }
    };
    const handleEdit = async () => {
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/comment/${
                    comment?._id
                }`,
                { text: text }
            );
            if (response.status === 200) {
                refetchPost();
                setEditMode(false);
                toast.success("Your comment has been updated", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.log(error?.response?.data?.message);
            toast.error(
                `${error?.response?.data?.message}. Failed to update comment.`,
                {
                    position: "top-right",
                    autoClose: 2000,
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
    };
    return (
        <div className="flex mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r  mr-2 ">
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px] mr-2">
                    <img
                        src={comment.author.avatar}
                        alt={comment?.author?.name}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="flex-1">
                <div className="flex items-center">
                    <span className="font-semibold text-sm">
                        {comment?.author?.name}
                    </span>

                    {/* {new Date(comment?.updatedAt).getTime() !==
                    new Date(comment?.createdAt).getTime() ? (
                        <span className="text-xs text-gray-500 ml-2">
                            edited{" "}
                            {getDateDifferenceFromNow(comment?.updatedAt)}
                        </span>
                    ) : ( */}
                    <span className="text-xs text-gray-500 ml-2">
                        {getDateDifferenceFromNow(comment?.createdAt)}
                    </span>
                    {/* )} */}
                </div>
                {!editMode ? (
                    <p className="text-sm mt-2 text-gray-800">
                        {comment?.comment}
                    </p>
                ) : (
                    <>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-sm px-1 bg-amber-100 border rounded-sm mt-2 text-gray-800"
                        />
                        <button
                            onClick={handleEdit}
                            className="px-1 text-xs border rounded-sm m-4 text-gray-900"
                        >
                            Save
                        </button>
                    </>
                )}
            </div>
            {showOptions && (
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="text-sm text-gray-500 hover:text-blue-600 transition"
                    >
                        {editMode ? "Back" : "Edit"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-sm text-gray-500 hover:text-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
