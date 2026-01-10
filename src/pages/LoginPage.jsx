import { useForm } from "react-hook-form";
import Logo from "../assets/logo-2.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { Bounce, toast } from "react-toastify";
export default function LoginPage() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm();
    const { setAuth } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitLogin = async (formData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
                formData
            );

            if (response.status === 200) {
                const { accessToken, refreshToken, user } = response.data;
                setAuth({
                    accessToken,
                    refreshToken,
                    user,
                });
                toast.success("Logged in successfully", {
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
                navigate("/");
            }
        } catch (error) {
            setError("root", {
                type: "manual",
                message: "Check your email password and try again",
            });
            toast.error("Check your email password and try again", {
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
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="login-container rounded-md">
                <div className="flex justify-center mb-8">
                    <img src={Logo} alt="PhotoBooth" className="h-[51px]" />
                </div>

                <div className="bg-white p-6 border border-gray-300 mb-3 rounded-md">
                    <form onSubmit={handleSubmit(submitLogin)}>
                        <div className="mb-3">
                            <div className="relative">
                                <input
                                    {...register("email", {
                                        required: "email is required.",
                                        minLength: 5,
                                    })}
                                    type="text"
                                    className="form-input"
                                    placeholder="Phone number, username, or email"
                                    aria-label="Phone number, username, or email"
                                />
                            </div>
                            {errors.root?.message && (
                                <p className=" text-red-600 text-sm">
                                    {errors.root.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <div className="relative">
                                <input
                                    {...register("password", {
                                        required: true,
                                        minLength: 4,
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="form-input"
                                    placeholder="Password"
                                    aria-label="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs"
                                >
                                    {showPassword ? "hide" : "show"}
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <button type="submit" className="login-button">
                                Log in
                            </button>
                        </div>

                        {/* <div className="or-separator">OR</div>

                        <div className="mb-4">
                            <button type="submit" className="login-button">
                                Log in with Google
                            </button>
                        </div> */}
                    </form>
                </div>

                <div className="bg-white p-6 border border-gray-300 text-center ">
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="text-blue-500 font-semibold"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
