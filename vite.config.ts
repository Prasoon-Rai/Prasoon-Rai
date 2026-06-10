// @lovable.dev/vite-tanstack-config already includes the following – do NOT add them manually
// or the app will break with duplicate plugins:
//   – tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare preset),
//   – componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack Dedupe,
//   – error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // <-- Make sure to import nitro here

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // This is the correct block to inject configuration changes into Lovable's hidden Vite engine
  vite: {
    plugins: [
      nitro({
        preset: "vercel", // <-- This explicitly forces the build target to Vercel
      }),
    ],
  },
});