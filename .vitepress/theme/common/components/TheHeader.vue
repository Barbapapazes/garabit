<script lang="ts" setup>
const { site } = useData();
</script>

<template>
  <header class="border-b-4 border-black bg-white p-8">
    <div
      class="mx-auto flex max-w-screen-md flex-col items-center justify-between gap-6 md:flex-row"
    >
      <span>
        <a href="/" class="text-2xl font-semibold text-black">
          {{ site.title }}
        </a>
      </span>

      <div class="flex items-center gap-6">
        <Button href="/blog" label="Blog" />

        <Button href="/projects" label="Projects" />
      </div>
    </div>
  </header>
</template>
