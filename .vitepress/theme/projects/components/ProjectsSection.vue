<script lang="ts">
import { Project } from "@/projects/types/project";

const projectsSection = tv({
  slots: {
    base: "space-y-10",
    title: "text-4xl font-semibold",
    card: "",
  },
});

export interface ProjectsSectionProps {
  title: string;
  projects: Project[];
  class?: any;
  ui?: Partial<typeof projectsSection.slots>;
}
export interface ProjectsSectionEmits {}
export interface ProjectsSectionSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<ProjectsSectionProps>();
defineEmits<ProjectsSectionEmits>();
defineSlots<ProjectsSectionSlots>();

const ui = computed(() => projectsSection());
</script>

<template>
  <section :class="ui.base({ class: [props.class, props.ui?.base] })">
    <h2 :class="ui.title({ class: props.ui?.title })">
      {{ props.title }}
    </h2>

    <Card
      v-for="project in props.projects"
      :key="project.url"
      :href="project.url"
      :title="project.name"
      :description="project.description"
      :class="ui.card({ class: props.ui?.card })"
      size="sm"
    />
  </section>
</template>
