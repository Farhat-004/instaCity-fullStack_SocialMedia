import { Link, Navigate, useNavigate } from "react-router";
import Logo from "../assets/logo-2.svg";
import useAuth from "../hooks/useAuth.jsx";
export default function Navbar() {
    const { auth } = useAuth();
    const user = auth.user;
    const navigate = useNavigate();
    return (
        <aside className="hidden floating-navbar bg-white  border px-6 py-2 md:flex flex-col">
            <Link
                to="/"
                className="flex gap-2 items-center font-medium py-4 mb-8"
            >
                <img
                    src={Logo}
                    alt="PhotoBooth"
                    className="h-6 object-contain border-none"
                />
                <h2 className="text-lg">instaCity</h2>
            </Link>

            <ul className="space-y-8 flex-1">
                <li>
                    <Link to="/" className="flex flex-row items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 stroke-zinc-800"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span className="text-sm text-zinc-800">Home</span>
                    </Link>
                </li>

                {user?.name && (
                    <li>
                        <Link
                            to="./chats"
                            className="flex flex-row items-center gap-2"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-6 w-6 "
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <g clip-path="url(#clip0_15_90)">
                                        {" "}
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                        ></rect>{" "}
                                        <path
                                            d="M20 12C20 16.4183 16.4183 20 12 20C10.5937 20 9.27223 19.6372 8.12398 19C7.53267 18.6719 4.48731 20.4615 3.99998 20C3.44096 19.4706 5.4583 16.6708 5.07024 16C4.38956 14.8233 3.99999 13.4571 3.99999 12C3.99999 7.58172 7.58171 4 12 4C16.4183 4 20 7.58172 20 12Z"
                                            stroke="#000000"
                                            stroke-linejoin="round"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_15_90">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                            ></rect>
                                        </clipPath>
                                    </defs>
                                </g>
                            </svg>

                            <span className="text-xs">Chats</span>
                        </Link>
                    </li>
                )}
                <li>
                    <Link
                        to="/create-post"
                        className="flex flex-row items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 stroke-zinc-800"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span className="text-xs">Create post</span>
                    </Link>
                </li>

                {user?.name && (
                    <li>
                        <Link
                            to={`/profile-page/${user?._id}`}
                            className="flex flex-row items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-user-icon lucide-user"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span className="text-xs">Profile</span>
                        </Link>
                    </li>
                )}
            </ul>

            {auth?.user?._id && (
                <div className="flex  justify-between">
                    <Link to={`/profile-page/${user?._id}`}>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                                {user?.avatar ?
                                    <img
                                        src={user?.avatar}
                                        alt="User avatar"
                                        className="w-full h-full object-cover"
                                    />
                                :   <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                                        {user?.name.charAt(0)}
                                    </div>
                                }
                            </div>
                            <div className="ml-2">
                                <span className="font-semibold text-sm">
                                    {user?.name}
                                </span>
                            </div>
                        </div>
                    </Link>

                    <button
                        onClick={() => navigate("/logout")}
                        title="logout"
                        className="text-sm"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1"
                        >
                            <path d="m8 0c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm-3.5 4h6.5v2h-6.5c-1.379 0-2.5 1.122-2.5 2.5v5.5h-2v-5.5c0-2.481 2.019-4.5 4.5-4.5zm11.5 8h2v2h-2c-1.654 0-3-1.346-3-3v-6c0-1.654 1.346-3 3-3h2v2h-2c-.552 0-1 .449-1 1v6c0 .551.448 1 1 1zm8-3.941c0 .548-.24 1.07-.658 1.432l-2.681 2.362-1.322-1.5 1.535-1.354h-3.874v-2h3.74l-1.401-1.235 1.322-1.5 2.688 2.37c.411.355.651.877.651 1.425z" />
                        </svg>
                    </button>
                </div>
            )}
            {!auth?.user && (
                <button
                    onClick={() => navigate("/login")}
                    title="login"
                    className="text-sm text-blue-500 font-semibold"
                >
                    login
                </button>
            )}
        </aside>
    );
}
