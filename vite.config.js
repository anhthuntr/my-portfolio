import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("font-awesome-icon"),
        },
      },
    }),
  ],
  base: "/",
  define: {
    "process.env": process.env,
    ENV_KEY: process.env.VITE_SERVER_URL,
  }
});
