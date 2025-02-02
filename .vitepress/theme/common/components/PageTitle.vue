<script lang="ts">
const pageTitle = tv({
  base: "text-6xl font-semibold",
});

export interface PageTitleProps {
  title: string;
  class?: any;
}
export interface PageTitleEmits {}
export interface PageTitleSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<PageTitleProps>();
defineEmits<PageTitleEmits>();
defineSlots<PageTitleSlots>();

const ui = computed(() => pageTitle());
</script>

<template>
  <h1 :class="ui">
    {{ props.title }}
  </h1>
</template>
