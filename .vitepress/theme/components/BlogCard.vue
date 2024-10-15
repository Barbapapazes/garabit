<script lang="ts" setup>
import { ContentData } from "vitepress";

defineProps<{
  post: ContentData;
}>();
</script>

<template>
  <article
    class="group relative space-y-6 border-4 border-black bg-white p-12 shadow-[8px_8px_0_black] transition duration-150 ease-linear hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_black]"
  >
    <h2 class="text-4xl font-medium text-black">
      <a :href="post.url">
        {{ post.frontmatter.title }}
        <span class="absolute inset-0"></span>
      </a>
    </h2>

    <p class="text-xl text-black">
      {{ post.frontmatter.description }}
    </p>
  </article>
</template>
