<script lang="ts">
import { data } from "@/blog/data/blog.data";

const blogList = tv({
  slots: {
    base: "space-y-10",
    card: "",
  },
});

export interface BlogListProps {
  class?: any;
  ui?: Partial<typeof blogList.slots>;
}
export interface BlogListEmits {}
export interface BlogListSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<BlogListProps>();
defineEmits<BlogListEmits>();
defineSlots<BlogListSlots>();

const ui = computed(() => blogList());
</script>

<template>
  <div :class="ui.base({ class: [props.class, props.ui?.base] })">
    <Card
      v-for="post in data"
      :key="post.title"
      :href="post.url"
      :title="post.frontmatter.title"
      :description="post.frontmatter.description"
      :class="ui.card({ class: props.ui?.card })"
    />
  </div>
</template>
