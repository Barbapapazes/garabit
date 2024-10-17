<script lang="ts" setup>
const { frontmatter } = useData();
</script>

<template>
  <div class="min-h-screen bg-[#FC88FF] py-16">
    <main class="mx-auto max-w-screen-md">
      <BlogIndex v-if="frontmatter.layout === 'blog'" />
      <BlogShow v-else-if="frontmatter.layout === 'blog-show'" />

      <ProjectsIndex v-else-if="frontmatter.layout === 'projects'" />
    </main>
  </div>
</template>
