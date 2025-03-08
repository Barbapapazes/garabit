import { Theme } from "vitepress";
import { PiniaColada } from "@pinia/colada";
import { createPinia } from "pinia";
import Layout from "./Layout.vue";

import "@/common/styles/app.css";
import "@/common/styles/code.css";
import "@/common/styles/alerts.css";

import "markdown-it-github-alerts/styles/github-base.css";

export default {
  Layout,
  enhanceApp({ app }) {
    app.use(createPinia());
    app.use(PiniaColada);
  },
} satisfies Theme;
