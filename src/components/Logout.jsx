import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { Bounce, toast } from "react-toastify";
import { useEffect } from "react";

export default function Logout() {
    const { setAuth } = useAuth();
    // useEffect(() => {
    //     const response = api;
    // }, []);
    setAuth({});
    const navigate = useNavigate();

    useEffect(() => {
        toast("Logged out successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigate("/");
    });
    return;
}
