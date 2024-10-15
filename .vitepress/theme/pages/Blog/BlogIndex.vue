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
      <ButtonPrimary href="/">Back to Home</ButtonPrimary>
    </div>
  </section>
</template>
