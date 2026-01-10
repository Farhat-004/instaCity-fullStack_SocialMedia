import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { Link, useNavigate, useParams } from "react-router";
import { toast, Bounce } from "react-toastify";
import useGetPost from "../hooks/useGetPost";
export default function EditPost() {
    const { auth } = useAuth();
    const params = useParams();
    const { post } = useGetPost(params?.postId);
    const navigate = useNavigate();
    const api = useAxios();
    const user = auth.user;
    const pictureBtnRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [isImageChanged, setIsImageChanged] = useState(false);
    useEffect(() => {
        if (post) {
            setImageUrl(post.image);
            setCaption(post.caption || "");
        }
    }, [post]);

    const handlePictureBtn = (e) => {
        e.preventDefault();
        pictureBtnRef.current.click();
    };

    const handleChangePicture = async () => {
        const fileList = pictureBtnRef.current.files;

        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }

        if (fileList && fileList.length > 0) {
            const newImageUrl = URL.createObjectURL(fileList[0]);
            setImageUrl(newImageUrl);
            setIsImageChanged(true);
        } else {
            setImageUrl("");
        }
    };

    const handlePost = async () => {
        // const formData = new FormData();
        const data = new FormData();

        const selectedFile = pictureBtnRef.current.files[0];

        data.append("file", selectedFile);
        data.append("upload_preset", "final-project");
        data.append("cloud_name", "dtk2ucppn");

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dtk2ucppn/image/upload",
            {
                method: "POST",
                body: data,
            }
        );
        const result = await response.json();
        if (isImageChanged) {
            setImageUrl(result.secure_url);
            // formData.append("image", result.secure_url);
        } else {
            setImageUrl(post?.image);
            // formData.append("image", post?.image);
        }

        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${
                    params.postId
                }`,
                { caption, image: imageUrl }
            );
            if (response.status === 200) {
                setImageUrl("");
                setCaption("");
                toast.success("Your post has been updated", {
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
                navigate("/");
            }
        } catch (error) {
            toast.error(
                `${error?.response?.data?.message}. Failed to update post.`,
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
        <div className="">
            <header className="h-14 border-b flex items-center justify-between px-4">
                <button className="p-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </button>

                <h1 className="text-base font-semibold">Update post</h1>
                <button
                    onClick={handlePost}
                    className="text-blue-500 font-semibold"
                >
                    Post
                </button>
            </header>
            <div className="upload-container flex flex-col md:flex-row">
                {/* <!-- Left Side - Image Preview --> */}
                <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center relative">
                    {imageUrl && (
                        <img
                            src={imageUrl ?? post?.image}
                            alt="Upload preview"
                            className="image-preview mt-48 mr-48 w-full object-cover max-h-[1000px]"
                        />
                    )}

                    <input
                        id="file"
                        type="file"
                        ref={pictureBtnRef}
                        onChange={handleChangePicture}
                        hidden
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <button
                            onClick={handlePictureBtn}
                            className="bg-black bg-opacity-75 text-white text-sm py-1 px-3 rounded-md"
                        >
                            Change picture
                        </button>
                    </div>
                </div>

                {/* <!-- Right Side - Post Details --> */}
                <div className="w-full md:w-1/2 bg-white flex flex-col">
                    {/* <!-- User Info --> */}
                    <div className="flex items-center p-4 border-b">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                            <img src={user?.avatar} />
                        </div>
                        <span className="ml-3 font-semibold text-sm">
                            {user?.name}
                        </span>
                    </div>

                    {/* <!-- Caption Section --> */}
                    <div className="p-4 border-b flex-grow">
                        <div className="mb-2">
                            <p className="font-medium text-base mb-2">
                                Caption Section
                            </p>
                            <textarea
                                value={caption}
                                onChange={(e) => {
                                    setCaption(e.target.value);
                                }}
                                className="w-full caption-input border-0 outline-none text-sm"
                                placeholder="Write a caption..."
                            />
                        </div>

                        {/* <!-- Character Count --> */}
                        <div className="flex justify-between items-center">
                            <button className="text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                            <span className="text-gray-400 text-xs">
                                15/2,200
                            </span>
                        </div>
                    </div>

                    {/* <!-- Additional Options --> */}
                    <div className="flex flex-col">
                        {/* <!-- Add Location --> */}
                        <button className="flex items-center justify-between p-4 border-b">
                            <span className="text-base text-gray-600">
                                Add location
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>

                        {/* <!-- Add Collaborators --> */}
                        <button className="flex items-center justify-between p-4 border-b">
                            <span className="text-base text-gray-600">
                                Add collaborators
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
