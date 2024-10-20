<script lang="ts" setup>
const { frontmatter } = useData();
</script>

<template>
  <article
    class="space-y-16 border-4 border-black bg-white p-8 shadow-[8px_8px_0_black] md:p-12"
  >
    <h1 class="text-6xl font-semibold">{{ frontmatter.title }}</h1>

    <Content class="prose prose-zinc text-black" />
  </article>

  <div class="mt-16 flex justify-center">
    <ButtonPrimary href="/blog"> Back to Blog </ButtonPrimary>
  </div>
</template>
