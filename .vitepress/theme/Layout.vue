<script lang="ts" setup>
import { ofetch } from "ofetch";
const { frontmatter } = useData();

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

ofetch("/api/posts/1/comments", {
  baseURL: import.meta.env.VITE_API_URL,
  method: "POST",
  body: {
    content: "Hello world!",
  },
  headers: {
    Accept: "application/json",
  },
  credentials: "include",
  onRequest: async ({ options }) => {
    const method = options.method?.toUpperCase() || "GET";

    if (["GET", "HEAD", "OPTIONS"].includes(method)) {
      return;
    }

    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      await ofetch("/sanctum/csrf-cookie", {
        baseURL: import.meta.env.VITE_API_URL,
        credentials: "include",
      });
    }

    options.headers.set(
      "X-Xsrf-Token",
      decodeURIComponent(getCookie("XSRF-TOKEN") || ""),
    );
  },
});
</script>

<template>
  <div class="min-h-screen bg-[#FC88FF]">
    <TheHeader />

    <div class="px-4 py-16">
      <main class="mx-auto max-w-screen-md">
        <Home v-if="frontmatter.layout === 'home'" />

        <BlogIndex v-else-if="frontmatter.layout === 'blog'" />
        <BlogShow v-else-if="frontmatter.layout === 'blog-show'" />

        <ProjectsIndex v-else-if="frontmatter.layout === 'projects'" />
      </main>
    </div>
  </div>
</template>
