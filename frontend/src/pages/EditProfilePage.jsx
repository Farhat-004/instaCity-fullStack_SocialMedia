import { useState, useRef, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";
import { Bounce, toast } from "react-toastify";
import ChangePassword from "../components/ChangePassword";
import { AvatarContext } from "../contexts";

export default function EditProfilePage() {
    const api = useAxios();
    const { setUserAvatar } = useContext(AvatarContext);
    const { user, loading, refetch } = useProfile();
    const [userData, setUserData] = useState(null);
    const photoBtnRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);

    const handleSubmit = async () => {
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users/me`,
                userData
            );
            if (response.status == 200) {
                toast.success("Profile data has been updated", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const handlePhotoBtn = (e) => {
        e.preventDefault();
        photoBtnRef.current.click();
    };

    const handleChangePhoto = async () => {
        const data = new FormData();

        data.append("file", photoBtnRef.current.files[0]);
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

        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users/me/avatar`,
                { avatar: result.secure_url }
            );
            if (response.status == 200) {
                setUserAvatar(response?.data?.user?.avatar);
                toast.success("Your avatar has been updated", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return loading ? (
        <h1
            className="font-bold text-center p-7
       "
        ></h1>
    ) : (
        <div className="edit-container">
            <h1 className="text-2xl font-bold mb-8">Edit profile</h1>

            <div className="bg-white rounded-lg p-6 mb-6">
                <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img
                            src={
                                userData?.avatar
                                // `${import.meta.env.VITE_SERVER_URL}/${userData?.avatar}`
                            }
                            alt={userData?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex">
                        <div>
                            {!isEditing && (
                                <h2 className="font-semibold text-base">
                                    {userData?.name}
                                </h2>
                            )}
                            {isEditing && (
                                <textarea
                                    value={userData?.name}
                                    className="h-7  font-bold"
                                    onChange={(e) => {
                                        setUserData({
                                            ...userData,
                                            name: e.target.value,
                                        });
                                    }}
                                    name="name"
                                    id="name"
                                />
                            )}
                        </div>
                        <div>
                            <button
                                className="text-xs ml-7 "
                                onClick={() => {
                                    setIsEditing(!isEditing);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                    <input
                        id="file"
                        type="file"
                        ref={photoBtnRef}
                        onChange={handleChangePhoto}
                        hidden
                    />
                    <button
                        onClick={handlePhotoBtn}
                        className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition"
                    >
                        Change photo
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 ">
                <label className="block mb-2 font-medium">Website</label>
                <input
                    type="text"
                    className="form-input mb-2"
                    value={userData?.website}
                    onChange={(e) => {
                        setUserData({ ...userData, website: e.target.value });
                    }}
                />
                <p className="text-gray-500 text-xs">
                    Editing your links is only available on mobile. Visit the
                    PhotoBooth app and edit your profile to change the websites
                    in your bio.
                </p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
                <label className="block mb-2 font-medium">Bio</label>
                <textarea
                    value={userData?.bio}
                    onChange={(e) => {
                        setUserData({ ...userData, bio: e.target.value });
                    }}
                    maxLength={150}
                    className="form-input resize-none h-24 mb-1"
                />
                <div className="flex justify-end">
                    <span className="text-gray-500 text-xs">
                        {userData?.bio?.length} / 150
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
                <label className="block mb-2 font-medium">Gender</label>
                <div className="relative">
                    <select
                        value={userData?.gender}
                        onChange={(e) => {
                            setUserData({
                                ...userData,
                                gender: e.target.value,
                            });
                        }}
                        className="form-input appearance-none pr-8"
                    >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                        <option>Custom</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    </div>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                    This won't be part of your public profile.
                </p>
            </div>

            <ChangePassword />

            <div className="mb-6">
                <p className="text-gray-500 text-sm">
                    Certain profile info, like your name, bio and links, is
                    visible to everyone.
                    <a href="#" className="text-blue-500">
                        See what profile info is visible
                    </a>
                </p>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-100 text-blue-500 px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
