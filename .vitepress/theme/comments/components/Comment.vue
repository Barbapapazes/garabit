<script lang="ts">
import { Comment } from "@/comments/types/comment";

const blogComment = tv({
  slots: {
    base: "space-y-4",
    content: "",
    footer: "flex items-center justify-between",
    actions: "flex items-center gap-2",
    author: "flex items-center gap-2 font-semibold",
    authorAvatar: "size-8 rounded-full",
  },
});

export interface BlogCommentProps {
  comment: Comment;
  class?: any;
  ui?: Partial<typeof blogComment.slots>;
}
export interface BlogCommentEmits {}
export interface BlogCommentSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<BlogCommentProps>();
defineEmits<BlogCommentEmits>();
defineSlots<BlogCommentSlots>();

const { mutate: deleteComment } = useDeleteComment();

const update = ref(false);

const ui = computed(() => blogComment());
</script>

<template>
  <article :class="ui.base({ class: [props.class, props.ui?.base] })">
    <CommentForm
      v-if="update"
      :comment="props.comment"
      @submit="update = false"
    />
    <p v-else>
      {{ props.comment.content }}
    </p>

    <div :class="ui.footer({ class: props.ui?.footer })">
      <div :class="ui.author({ class: props.ui?.author })">
        <img
          v-if="props.comment.author.avatar"
          :src="props.comment.author.avatar"
          :class="ui.authorAvatar({ class: props.ui?.authorAvatar })"
        />
        <template v-if="props.comment.author.name">
          {{ props.comment.author.name }} ({{ props.comment.author.username }})
        </template>
        <template v-else>
          {{ props.comment.author.username }}
        </template>
      </div>

      <div :class="ui.actions({ class: props.ui?.actions })">
        <button v-if="props.comment.can.update" @click="update = !update">
          Edit
        </button>
        <button
          v-if="props.comment.can.delete"
          @click="deleteComment({ commentId: props.comment.id })"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
</template>
