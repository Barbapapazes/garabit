<script lang="ts" setup>
import { data } from "../../../data/github-projects.data";

const { frontmatter } = useData();
</script>

<template>
  <section class="space-y-16">
    <h1 class="text-6xl font-semibold">{{ frontmatter.title }}</h1>

    <div class="space-y-20" v-for="section in data" :key="section.title">
      <section class="space-y-10">
        <h2 class="text-4xl font-semibold">{{ section.title }}</h2>

        <ProjectCard
          v-for="project in section.projects"
          :key="project.url"
          :project="project"
        />
      </section>
    </div>

    <div class="flex justify-center">
      <ButtonPrimary href="/">Back to Home</ButtonPrimary>
    </div>
  </section>
</template>
