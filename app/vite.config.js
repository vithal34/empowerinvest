import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "https://empowerinvest-back.onrender.com",
    proxy: {
      "/api": {
        target: "https://empowerinvest-back.onrender.com:10000", // Change to your backend URL
        changeOrigin: true, // Set to true for cross-domain requests
        secure: true, // Set to true if your backend URL uses HTTPS
        ws: true, // Enable WebSocket proxying
      },
    },
  },
});
