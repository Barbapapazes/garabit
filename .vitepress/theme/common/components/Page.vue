<script lang="ts">
const page = tv({
  base: "space-y-16",
});

export interface PageProps {
  class?: any;
}
export interface PageEmits {}
export interface PageSlots {
  default: (props?: object) => any;
}
</script>

<script lang="ts" setup>
const props = defineProps<PageProps>();
defineEmits<PageEmits>();
defineSlots<PageSlots>();

const ui = computed(() => page({ class: props.class }));
</script>

<template>
  <section :class="ui">
    <slot />
  </section>
</template>
