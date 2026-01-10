import axios from "axios";
import { useState } from "react";
import Logo from "../assets/logo-2.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

export default function RegistrationPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitLogin = async (formData) => {
        // if(formData.pass) ;
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/signup`,
                formData
            );
            if (response.status === 201) {
                toast.success("Registered in successfully", {
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
                navigate("/login");
            }
        } catch (error) {
            toast.error(`${error?.response?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setError("root", {
                type: "manual",
                message: "This email is already registered .",
            });
        }
    };
    return (
        <div className="min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8">
            <div className="signup-container">
                <div className="flex justify-center mb-4">
                    <img src={Logo} alt="PhotoBooth" className="h-[51px]" />
                </div>

                <div className="bg-white p-6 border border-gray-300 mb-3">
                    <h2 className="text-center font-semibold text-gray-500 text-lg mb-4">
                        Sign up to see photos and videos from your friends.
                    </h2>

                    <form onSubmit={handleSubmit(submitLogin)}>
                        <div className="mb-3">
                            <div className="relative">
                                <input
                                    {...register("email", {
                                        required: "email is required.",
                                        minLength: 5,
                                    })}
                                    type="text"
                                    id="email"
                                    className="form-input"
                                    placeholder="email"
                                    aria-label="email"
                                />
                            </div>
                        </div>

                        <div className="mb-2">
                            <div className="relative">
                                <input
                                    {...register("name", {
                                        required: "name is required.",
                                        minLength: 5,
                                    })}
                                    type="text"
                                    className="form-input"
                                    placeholder="Full Name"
                                    id="Full Name"
                                    aria-label="Full Name"
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="relative">
                                <input
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="form-input"
                                    placeholder="Password"
                                    aria-label="Password"
                                    id="Password"
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

                        <div className="mb-3">
                            <div className="relative">
                                <input
                                    {...register("confirm-password", {
                                        required: true,
                                        minLength: 6,
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="form-input"
                                    id="Confirm Password"
                                    placeholder="Confirm Password"
                                    aria-label="Confirm Password"
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

                        <div className="mb-2">
                            <button type="submit" className="signup-button">
                                Sign up
                            </button>
                        </div>
                        {errors.root && (
                            <p className="text-red-600">
                                {errors.root.message}
                            </p>
                        )}
                    </form>
                </div>

                <div className="bg-white p-6 border border-gray-300 text-center mb-4 rounded-md">
                    <p className="text-sm">
                        Have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 font-semibold"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
