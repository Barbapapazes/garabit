<script lang="ts">
import type { VariantProps } from "tailwind-variants";

const button = tv({
  base: "border-4 border-black px-8 py-4 shadow-[4px_4px_0_black] transition duration-150 ease-linear hover:-translate-x-[0.125rem] hover:-translate-y-[0.125rem] hover:shadow-[6px_6px_0_black]",
  variants: {
    color: {
      primary: "bg-[var(--color-yellow)] hover:bg-[#ffdf1b]",
      secondary: "text-white bg-[var(--color-purple)] hover:bg-[#828cd2]",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;

export interface ButtonProps {
  href?: string;
  label: string;
  color?: ButtonVariants["color"];
  class?: any;
  onClick?: () => void;
}
export interface ButtonEmits {}
export interface ButtonSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<ButtonProps>();
defineEmits<ButtonEmits>();
defineSlots<ButtonSlots>();

const ui = computed(() => button({ class: props.class, color: props.color }));
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    :class="ui"
    @click="props.onClick"
  >
    {{ props.label }}
  </component>
</template>
