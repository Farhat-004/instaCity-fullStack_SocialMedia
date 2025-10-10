import { passwordStrength } from "check-password-strength";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { Bounce, toast } from "react-toastify";

export default function ChangePassword() {
    const api = useAxios();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const [password, SetPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    let strength = passwordStrength(password.newPassword).value;
    const handlePassword = async () => {
        if (password.newPassword == password.confirmPassword) {
            try {
                const response = await api.patch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/users/me/password`,
                    {
                        currentPassword: password.currentPassword,
                        newPassword: password.newPassword,
                    }
                );
                if (response.status == 200) {
                    SetPassword({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });

                    toast.success(response.data.message, {
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
                    navigate("/login");
                }
            } catch (err) {
                setError(err.message);
                toast.error(err?.response?.data?.message, {
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
        } else {
            setError("Password didn't match with new password");
            toast.error("Password didn't match with new password", {
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
        <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="font-medium text-lg mb-4">Change Password</h2>

            <div className="mb-4">
                <label className="block mb-2 text-sm">Current Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password.currentPassword}
                        onChange={(e) => {
                            SetPassword({
                                ...password,
                                currentPassword: e.target.value,
                            });
                        }}
                        className="form-input pr-10"
                        placeholder="Enter your current password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm"
                    >
                        {showPassword ? "hide" : "show"}
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm">New Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password.newPassword}
                        onChange={(e) => {
                            SetPassword({
                                ...password,
                                newPassword: e.target.value,
                            });
                        }}
                        className="form-input pr-10 mb-1"
                        placeholder="Enter new password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm"
                    >
                        {showPassword ? "hide" : "show"}
                    </button>
                </div>

                <div className="flex w-full h-1 mb-1">
                    {strength == "Too weak" && (
                        <div className="password-strength  bg-red-500 w-1/4"></div>
                    )}
                    {strength == "Weak" && (
                        <div className="password-strength bg-orange-500 w-2/4"></div>
                    )}
                    {strength == "Medium" && (
                        <div className="password-strength bg-yellow-500 w-3/4"></div>
                    )}
                    {strength == "Strong" && (
                        <div className="password-strength bg-green-500 w-full"></div>
                    )}
                </div>
                <p className="text-xs text-gray-500 mb-3">
                    For a strong password, use at least 8 characters with a mix
                    of letters, numbers, and symbols.
                </p>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm">
                    Confirm New Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password.confirmPassword}
                        onChange={(e) => {
                            SetPassword({
                                ...password,
                                confirmPassword: e.target.value,
                            });
                        }}
                        className="form-input pr-10"
                        placeholder="Confirm new password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm"
                    >
                        {showPassword ? "hide" : "show"}
                    </button>
                </div>
                {error && <p className="m-1 text-red-700 text-xs">{error}</p>}
            </div>

            <button
                onClick={handlePassword}
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition"
            >
                Change Password
            </button>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                    After changing your password, you'll be logged out of all
                    devices except the ones you're using now.
                </p>
            </div>
        </div>
    );
}
