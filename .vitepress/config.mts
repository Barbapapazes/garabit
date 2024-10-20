import { defineConfig } from "vitepress";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { joinURL, withoutTrailingSlash } from "ufo";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

const currentDir = dirname(fileURLToPath(import.meta.url));

const componentsDir = resolve(currentDir, "theme", "components");
const pagesDir = resolve(currentDir, "theme", "pages");

const composablesDir = resolve(currentDir, "theme", "composables");
const utilsDir = resolve(currentDir, "theme", "utils");

export default defineConfig({
  srcDir: "src",

  lang: "en-US",
  title: "Garabit",
  description: "A place that reflects my thoughts and ideas",

  head: [
    ["meta", { name: "twitter:site", content: "@soubiran_" }], // Please, change this before deploying
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:site_name", content: "Garabit" }],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      { property: "og:url", content: "https://garabit.barbapapazes.dev" }, // Please, change this before deploying
    ],
  ],

  async transformPageData(pageData, { siteConfig }) {
    // Initialize the `head` frontmatter if it doesn't exist.
    pageData.frontmatter.head ??= [];

    // Add basic meta tags to the frontmatter.
    pageData.frontmatter.head.push(
      [
        "meta",
        {
          property: "og:title",
          content:
            pageData.frontmatter.title ||
            pageData.title ||
            siteConfig.site.title,
        },
      ],
      [
        "meta",
        {
          name: "twitter:title",
          content:
            pageData.frontmatter.title ||
            pageData.title ||
            siteConfig.site.title,
        },
      ],
      [
        "meta",
        {
          property: "og:description",
          content:
            pageData.frontmatter.description ||
            pageData.description ||
            siteConfig.site.description,
        },
      ],
      [
        "meta",
        {
          name: "twitter:description",
          content:
            pageData.frontmatter.description ||
            pageData.description ||
            siteConfig.site.description,
        },
      ],
    );

    // Add the canonical URL
    pageData.frontmatter.head.push([
      "link",
      {
        rel: "canonical",
        href: joinURL(
          "https://garabit.barbapapazes.dev", // Please, change this before deploying
          withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, "")),
        ),
      },
    ]);

    // Set layout for blog articles
    if (pageData.filePath.startsWith("blog/")) {
      pageData.frontmatter.layout = "blog-show";
    }
  },

  sitemap: {
    hostname: "https://garabit.barbapapazes.dev", // Please, change this before deploying
  },

  cleanUrls: true,

  markdown: {
    config(md) {
      md.use(MarkdownItGitHubAlerts);
    },

    theme: "everforest-light",
    gfmAlerts: true,
  },

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
