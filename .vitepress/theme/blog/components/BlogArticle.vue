<script lang="ts">
const blogArticle = tv({
  slots: {
    base: "space-y-16 border-4 border-black bg-white p-8 shadow-[8px_8px_0_black] md:p-12",
    title: "text-6xl font-semibold",
    prose: "",
  },
});

export interface BlogArticleProps {
  title: string;
  class?: any;
  ui?: Partial<typeof blogArticle.slots>;
}
export interface BlogArticleEmits {}
export interface BlogArticleSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<BlogArticleProps>();
defineEmits<BlogArticleEmits>();
defineSlots<BlogArticleSlots>();

const ui = computed(() => blogArticle());
</script>

<template>
  <article :class="ui.base({ class: [props.class, props.ui?.base] })">
    <h1 :class="ui.title({ class: props.ui?.title })">
      {{ props.title }}
    </h1>

    <Prose :class="ui.prose({ class: props.ui?.prose })">
      <Content />
    </Prose>
  </article>
</template>
