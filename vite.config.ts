import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "main",
      remotes: {
        login: 'http://localhost:5001/assets/remoteEntry.js',
        profile: 'http://localhost:5002/assets/remoteEntry.js',
        // login: "http://localhost:5001/remoteEntry.js",
        // profile: "http://localhost:5002/remoteEntry.js",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "react-redux",
        "@repo/shared-store",
      ],
    }),
  ],
  server: {
    port: 5000,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5000,
  },
});
