import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 h-screen">
                <Navbar />
            </aside>

            {/* Content */}
            <main className="flex-1">
                <div className="max-w-6xl mx-auto w-full py-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
