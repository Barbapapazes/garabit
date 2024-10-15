<script lang="ts" setup>
const { frontmatter } = useData();
</script>

<template>
  <div class="min-h-screen bg-[#FC88FF] pt-16">
    <main class="mx-auto max-w-screen-md">
      <BlogIndex v-if="frontmatter.layout === 'blog'" />
    </main>
  </div>
</template>
