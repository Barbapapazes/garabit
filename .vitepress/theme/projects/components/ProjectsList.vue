<script lang="ts">
import { data } from "@/projects/data/github-projects.data";

const projectsList = tv({
  base: "space-y-20",
});

export interface ProjectsListProps {
  class?: any;
}
export interface ProjectsListsEmits {}
export interface ProjectsListSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<ProjectsListProps>();
defineEmits<ProjectsListsEmits>();
defineSlots<ProjectsListSlots>();

const ui = computed(() => projectsList({ class: props.class }));
</script>

<template>
  <div v-for="section in data" :key="section.title" :class="ui">
    <ProjectsSection :title="section.title" :projects="section.projects" />
  </div>
</template>
