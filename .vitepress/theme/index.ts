import { Theme } from "vitepress";
import Layout from "./Layout.vue";

import "./styles/app.css";
import "./styles/code.css";
import "./styles/alerts.css";

import "markdown-it-github-alerts/styles/github-base.css";

export default {
  Layout,
} satisfies Theme;
