import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        proxy: {
            // Redirect all requests starting with '/api' to your Express server
            "/api": {
                target: import.meta.env.BACKEND_URL,
                changeOrigin: true, // Needed for virtual hosted sites
                rewrite: (path) => path.replace(/^\/api/, ""), // Optional: remove the /api prefix when forwarding to Express
            },
        },
    },
});
