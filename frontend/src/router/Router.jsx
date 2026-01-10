import { createBrowserRouter } from "react-router";
import Notification from "../pages/Notification";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import Logout from "../components/Logout";
import App from "../App";
import EditProfilePage from "../pages/EditProfilePage";
import PostDetails from "../pages/PostDetails";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
export const Router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/profile-page/:userId",
                element: <ProfilePage />,
            },
            // {
            //     path: "/notification",
            //     element: <Notification />,
            // },
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/post/:postId",
                element: <PostDetails />,
            },
            {
                path: "/edit-profile",
                element: <EditProfilePage />,
            },
            {
                path: "/create-post",
                element: <CreatePost />,
            },
            {
                path: "/edit-post/:postId",
                element: <EditPost />,
            },
        ],
    },

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/register",
        element: <RegistrationPage />,
    },

    // {
    //     path: "*",
    //     element: <Error />,
    // },
]);
