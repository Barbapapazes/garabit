<script lang="ts" setup>
defineProps<{
  href: string;
}>();
</script>

<template>
  <a
    :href
    class="border-4 border-black bg-[var(--color-yellow)] px-8 py-4 shadow-[4px_4px_0_black] transition duration-150 ease-linear hover:-translate-x-[0.125rem] hover:-translate-y-[0.125rem] hover:bg-[#ffdf1b] hover:shadow-[6px_6px_0_black]"
  >
    <slot />
  </a>
</template>
