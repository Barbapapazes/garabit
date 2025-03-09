<script lang="ts">
import { Comment } from "@/comments/types/comment";

const commentForm = tv({
  slots: {
    base: "flex flex-col gap-4",
    textarea:
      "border-4 border-black px-8 py-4 shadow-[4px_4px_0_black] focus:outline-none",
    button: "",
  },
});

export interface CommentFormProps {
  comment?: Comment;
  class?: any;
  ui?: Partial<typeof commentForm.slots>;
}
export interface CommentFormEmits {
  submit: [void];
}
export interface CommentFormSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<CommentFormProps>();
const emit = defineEmits<CommentFormEmits>();
defineSlots<CommentFormSlots>();

const { frontmatter } = useData();
const queryCache = useQueryCache();

const content = ref(props.comment?.content ?? "");

const {
  mutate: storeComment,
  isLoading: isStoreCommentLoading,
  error: storeCommentError,
} = useMutation<
  {
    data: Comment;
  },
  { postId: number; content: string; parentId?: number },
  {
    data: {
      message: string;
      errors: {
        content: string[];
      };
    };
  }
>({
  mutation: ({ postId, content }) => postComment(postId, content),
  onSuccess: () => {
    content.value = "";
  },
  onSettled: () =>
    queryCache.invalidateQueries({
      key: ["comments", frontmatter.value.id],
      exact: true,
    }),
});

const {
  mutate: updateComment,
  isLoading: isUpdateCommentLoading,
  error: updateCommentError,
} = useMutation<
  {
    data: Comment;
  },
  { commentId: number; content: string },
  {
    data: {
      message: string;
      errors: {
        content: string[];
      };
    };
  }
>({
  mutation: ({ commentId, content }) => putComment(commentId, content),
  onSuccess: (data) => {
    content.value = "";

    const comments =
      queryCache.getQueryData<Comment[]>(["comments", frontmatter.value.id]) ??
      ([] as Comment[]);

    const index = comments.findIndex(
      (comment: Comment) => comment.id === data.data.id,
    );
    if (index !== -1) {
      comments[index] = data.data;
      queryCache.setQueryData(["comments", frontmatter.value.id], comments);
    }

    emit("submit");
  },
  onSettled: () =>
    queryCache.invalidateQueries({
      key: ["comments", frontmatter.value.id],
      exact: true,
    }),
});

function onSubmit() {
  if (props.comment) {
    updateComment({
      commentId: props.comment.id,
      content: content.value,
    });
  } else {
    storeComment({ postId: frontmatter.value.id, content: content.value });
  }
}

const error = computed(
  () => storeCommentError.value || updateCommentError.value,
);
const isLoading = computed(
  () => isStoreCommentLoading.value || isUpdateCommentLoading.value,
);

const ui = computed(() => commentForm());
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    :class="ui.base({ class: [props.class, props.ui?.base] })"
  >
    <textarea
      v-model="content"
      placeholder="Write a comment..."
      :class="ui.textarea({ class: props.ui?.textarea })"
    ></textarea>

    <span v-if="error" class="text-red-500">{{ error.data.message }}</span>

    <Button
      type="submit"
      :label="props.comment ? 'Edit' : 'Comment'"
      :class="ui.button({ class: props.ui?.button })"
      :disabled="isLoading"
    />
  </form>
</template>
