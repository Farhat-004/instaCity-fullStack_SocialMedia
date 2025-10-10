import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Router } from "./router/Router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={Router} />
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </AuthProvider>
    </StrictMode>
);
