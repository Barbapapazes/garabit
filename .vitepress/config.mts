import { defineConfig, SiteConfig } from "vitepress";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { joinURL, withoutTrailingSlash } from "ufo";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { genOg } from "./genOg";
import { genMeta } from "./generators/meta";

const currentDir = dirname(fileURLToPath(import.meta.url));
const themeDir = resolve(currentDir, "theme");

const componentsDir = resolve(themeDir, "**", "components");
const pagesDir = resolve(themeDir, "**", "pages");

const composablesDir = resolve(themeDir, "**", "composables");
const utilsDir = resolve(themeDir, "**", "utils");
const queriesDir = resolve(themeDir, "**", "queries");
const mutationsDir = resolve(themeDir, "**", "mutations");
const apiFile = resolve(themeDir, "**", "api.ts");

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

    pageData.frontmatter.head.push([
      "meta",
      {
        property: "og:url",
        content: joinURL(
          "https://garabit.barbapapazes.dev", // Please, change this before deploying
          withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, "")),
        ),
      },
    ]);

    // Set layout for blog articles
    if (pageData.filePath.startsWith("blog/")) {
      pageData.frontmatter.layout = "blog-show";
    }

    // Automatically generate an Open Graph image
    const ogName = pageData.filePath
      .replaceAll(/\//g, "-")
      .replace(/\.md$/, ".png");
    await genOg(
      pageData.frontmatter.title || pageData.title || siteConfig.site.title,
      joinURL(siteConfig.srcDir, "public", "og", ogName),
    );

    // Add the Open Graph image to the frontmatter
    pageData.frontmatter.head.push(
      [
        "meta",
        {
          property: "og:image",
          content: joinURL(
            "https://garabit.barbapapazes.dev", // Please, change this before deploying
            "og",
            ogName,
          ),
        },
      ],
      [
        "meta",
        {
          name: "twitter:image",
          content: joinURL(
            "https://garabit.barbapapazes.dev", // Please, change this before deploying
            "og",
            ogName,
          ),
        },
      ],
    );
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

  buildEnd: async (config: SiteConfig) => {
    await genMeta(config);
  },

  vite: {
    plugins: [
      {
        name: "watcher",
        configureServer(server) {
          server.watcher.add(themeDir);
        },
      },
      AutoImport({
        imports: [
          "vue",
          "vitepress",
          { from: "tailwind-variants", imports: ["tv"] },
          {
            from: "@pinia/colada",
            imports: [
              "defineQuery",
              "useQuery",
              "defineMutation",
              "useMutation",
              "useQueryCache",
            ],
          },
        ],
        dirs: [composablesDir, utilsDir, queriesDir, mutationsDir, apiFile],
        dts: resolve(currentDir, "auto-imports.d.ts"),
      }),
      Components({
        dirs: [componentsDir, pagesDir],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: resolve(currentDir, "components.d.ts"),
      }),
    ],
    resolve: {
      alias: {
        "@": themeDir,
      },
    },
  },
});
