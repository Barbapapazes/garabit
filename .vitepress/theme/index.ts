import { Theme } from "vitepress";
import Layout from "./Layout.vue";

import "@/common/styles/app.css";
import "@/common/styles/code.css";
import "@/common/styles/alerts.css";

import "markdown-it-github-alerts/styles/github-base.css";

export default {
  Layout,
} satisfies Theme;
