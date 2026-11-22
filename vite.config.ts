import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

function selectedRemoteReload(): Plugin {
  return {
    name: "selected-remote-reload",
    configureServer(server) {
      const selectedRemote = process.env.VITE_DEV_MODULE;
      if (selectedRemote !== "login" && selectedRemote !== "profile") return;

      const remoteEntryPath = fileURLToPath(
        new URL(`../${selectedRemote}/dist/assets/remoteEntry.js`, import.meta.url),
      );
      server.watcher.add(remoteEntryPath);
      server.watcher.on("all", (event, changedPath) => {
        if (
          (event === "change" || event === "add") &&
          resolve(changedPath) === remoteEntryPath
        ) {
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    selectedRemoteReload(),
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
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    sourcemap: true,
  },
  preview: {
    port: 5000,
  },
});
