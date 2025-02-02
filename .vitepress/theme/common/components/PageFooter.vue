<script lang="ts">
const pageFooter = tv({
  base: "flex justify-center",
});

export interface PageFooterProps {
  backTo: { href: string; label: string };
  class?: any;
}
export interface PageFooterEmits {}
export interface PageFooterSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<PageFooterProps>();
defineEmits<PageFooterEmits>();
defineSlots<PageFooterSlots>();

const ui = computed(() => pageFooter({ class: props.class }));
</script>

<template>
  <div :class="ui">
    <Button :href="props.backTo.href" :label="props.backTo.label" />
  </div>
</template>
