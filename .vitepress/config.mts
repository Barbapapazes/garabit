import { defineConfig } from "vitepress";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

const currentDir = dirname(fileURLToPath(import.meta.url));

const componentsDir = resolve(currentDir, "theme", "components");
const pagesDir = resolve(currentDir, "theme", "pages");

const composablesDir = resolve(currentDir, "theme", "composables");
const utilsDir = resolve(currentDir, "theme", "utils");

export default defineConfig({
  srcDir: "src",

  vite: {
    plugins: [
      {
        name: "watcher",
        configureServer(server) {
          server.watcher.add([
            componentsDir,
            pagesDir,
            composablesDir,
            utilsDir,
          ]);
        },
      },
      AutoImport({
        imports: ["vue", "vitepress"],
        dirs: [composablesDir, utilsDir],
        dts: resolve(currentDir, "auto-imports.d.ts"),
      }),
      Components({
        dirs: [componentsDir, pagesDir],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: resolve(currentDir, "components.d.ts"),
      }),
    ],
  },
});
