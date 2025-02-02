<script lang="ts">
const pageProse = tv({
  base: "prose prose-zinc text-black [&>div>div>*:first-child]:mt-0 [&>div>div>*:last-child]:mb-0",
});

export interface PageProseProps {
  class?: any;
}
export interface PageProseEmits {}
export interface PageProseSlots {
  default: (props?: object) => any;
}
</script>

<script lang="ts" setup>
const props = defineProps<PageProseProps>();
defineEmits<PageProseEmits>();
defineSlots<PageProseSlots>();

const ui = computed(() => pageProse({ class: props.class }));
</script>

<template>
  <div :class="ui">
    <slot />
  </div>
</template>
