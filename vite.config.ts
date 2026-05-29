import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { fileURLToPath, URL } from "url";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nitro({ preset: "vercel" }) // <-- We activate nitro and tell it to build for Vercel here
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});