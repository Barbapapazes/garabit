<script lang="ts" setup>
const { frontmatter } = useData();
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
