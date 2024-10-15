<script lang="ts" setup>
import { data } from "../../../data/blog.data";

const { frontmatter } = useData();
</script>

<template>
  <section class="space-y-16">
    <h1 class="text-6xl font-semibold">{{ frontmatter.title }}</h1>

    <div class="space-y-10">
      <BlogCard v-for="post in data" :key="post.url" :post="post" />
    </div>

    <div class="flex justify-center">
      <a
        href="/"
        class="border-4 border-black bg-[#FFEB00] px-8 py-4 shadow-[4px_4px_0_black] transition duration-150 ease-linear hover:-translate-x-[0.125rem] hover:-translate-y-[0.125rem] hover:bg-[#fff90d] hover:shadow-[6px_6px_0_black]"
        >Back to Home</a
      >
    </div>
  </section>
</template>
