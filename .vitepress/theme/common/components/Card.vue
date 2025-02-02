<script lang="ts">
import type { VariantProps } from "tailwind-variants";

const card = tv({
  slots: {
    base: "group relative border-4 border-black bg-white shadow-[8px_8px_0_black] transition duration-150 ease-linear hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_black]",
    title: "font-medium text-black",
    description: "text-black",
  },
  variants: {
    size: {
      sm: {
        base: "space-y-4 p-6",
        title: "text-2xl",
        description: "text-lg",
      },
      md: {
        base: "space-y-6 p-12",
        title: "text-4xl",
        description: "text-xl",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CardVariants = VariantProps<typeof card>;

export interface CardProps {
  href: string;
  title: string;
  description?: string;
  size: CardVariants["size"];
  class?: any;
  ui?: Partial<typeof card.slots>;
}
export interface CardEmits {}
export interface CardSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<CardProps>();
defineEmits<CardEmits>();
defineSlots<CardSlots>();

const ui = computed(() =>
  card({
    size: props.size,
  }),
);
</script>

<template>
  <article :class="ui.base({ class: [props.class, props.ui?.base] })">
    <h2 :class="ui.title({ class: props.ui?.title })">
      <a :href="props.href">
        {{ props.title }}
        <span class="absolute inset-0"></span>
      </a>
    </h2>

    <p :class="ui.description({ class: props.ui?.description })">
      {{ props.description }}
    </p>
  </article>
</template>
