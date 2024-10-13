import { defineConfig } from "vitepress";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  vite: {
    plugins: [Components()],
  },
});
