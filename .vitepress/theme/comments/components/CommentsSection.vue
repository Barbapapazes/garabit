<script lang="ts">
const blogCommentsSection = tv({
  slots: {
    base: "space-y-12",
    title: "text-2xl font-bold",
    list: "space-y-8",
  },
});

export interface BlogCommentsSectionProps {
  class?: any;
  ui?: Partial<typeof blogCommentsSection.slots>;
}
export interface BlogCommentsSectionEmits {}
export interface BlogCommentsSectionSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<BlogCommentsSectionProps>();
defineEmits<BlogCommentsSectionEmits>();
defineSlots<BlogCommentsSectionSlots>();

const { state: commentsState } = useComments();

const ui = computed(() => blogCommentsSection());
</script>

<template>
  <section :class="ui.base({ class: [props.class, props.ui?.base] })">
    <h2 :class="ui.title({ class: props.ui?.title })">Comments</h2>

    <div v-if="commentsState.status === 'pending'">Loading comments...</div>
    <div v-else-if="commentsState.status === 'error'">
      Error loading comments
    </div>

    <template v-else>
      <CommentsList
        :comments="commentsState.data"
        :class="ui.list({ class: props.ui?.list })"
      />

      <AddComment />
    </template>
  </section>
</template>
