import { Link, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import MorePosts from "../components/posts/MorePost";
import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";

export default function ProfilePage() {
    const { auth } = useAuth();
    const params = useParams();
    const [userData, setUserData] = useState(null);
    const { user, loading, postsCount } = useGetUser(params?.userId);
    console.log(user);

    useEffect(() => {
        if (params.userId && user) {
            setUserData(user);
        }
    }, [user, params.userId]);
    return (
        <div className="main-container">
            {auth?.user?._id ? (
                <div className="profile-container">
                    {loading && (
                        <h1 className="text-5xl ">
                            Loading profile. . .. ...{" "}
                        </h1>
                    )}
                    <div className="flex flex-col md:flex-row mb-10">
                        <div className="flex justify-items-end md:justify-start md:w-1/3 mb-6 md:mb-0 relative">
                            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-300 mx-auto">
                                <img
                                    src={
                                        // `${import.meta.env.VITE_SERVER_URL}/${
                                        //     userData?.avatar
                                        // }`
                                        userData?.avatar
                                    }
                                    alt="Profile picture"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
                                <h2 className="text-xl font-normal mb-4 sm:mb-0 sm:mr-4">
                                    {userData?.name}
                                </h2>
                            </div>
                            {auth?.user?._id == params.userId && (
                                <div className="flex space-x-2">
                                    <Link
                                        to="/edit-profile"
                                        className="bg-gray-100 px-4 py-1.5 rounded-md text-sm font-medium"
                                    >
                                        Edit profile
                                    </Link>
                                </div>
                            )}

                            <div className="flex justify-center sm:justify-start space-x-8 mb-4 mt-2">
                                <div>
                                    <span className="font-semibold">
                                        {postsCount || 0}
                                    </span>{" "}
                                    posts
                                </div>
                            </div>

                            <div className="text-sm">
                                <p>{userData?.bio}</p>
                                <p className="text-blue-900">
                                    <a
                                        href={user?.website}
                                        target="_blank"
                                        className="flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            />
                                        </svg>
                                        {userData?.website}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <section>
                        {postsCount ? (
                            <>
                                <h3 className="font-semibold text-lg mb-4">
                                    Posts
                                </h3>
                                <MorePosts userId={params?.userId} />
                            </>
                        ) : (
                            <p className="font-semibold text-lg mb-4">
                                No Posts
                            </p>
                        )}
                    </section>
                </div>
            ) : (
                <div className=" m-40">
                    <h1 className="text-3xl">
                        Login to see your profile details
                    </h1>
                    <Link className="m-40 mt-10 text-blue-950" to="/login">
                        Click to login
                    </Link>
                </div>
            )}
        </div>
    );
}
