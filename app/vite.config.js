import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "https://empowerinvest-back.onrender.com",
    proxy: {
      "/api": {
        target: "https://empowerinvest-back.onrender.com:10000", // Change the target URL here
        changeOrigin: true, // Set this to true if you are proxying to a different domain
        secure: false, // Set this to false if your target URL uses HTTP instead of HTTPS
        ws: true, // Enable WebSocket proxying
      },
    },
  },
});
