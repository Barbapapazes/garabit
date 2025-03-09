<script lang="ts">
import type { Comment } from "@/comments/types/comment";

const blogComments = tv({
  slots: {
    base: "space-y-8",
    empty: "",
  },
});

export interface BlogCommentsProps {
  comments: Comment[];
  class?: any;
  ui?: Partial<typeof blogComments.slots>;
}
export interface BlogCommentsEmits {}
export interface BlogCommentsSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<BlogCommentsProps>();
defineEmits<BlogCommentsEmits>();
defineSlots<BlogCommentsSlots>();

const ui = computed(() => blogComments());
</script>

<template>
  <ol :class="ui.base({ class: props.ui?.base })">
    <li
      v-if="props.comments.length === 0"
      :class="ui.empty({ class: props.ui?.empty })"
    >
      No comments yet.
    </li>
    <template v-else>
      <li v-for="comment in props.comments" :key="comment.id">
        <Comment :comment="comment" />
      </li>
    </template>
  </ol>
</template>
