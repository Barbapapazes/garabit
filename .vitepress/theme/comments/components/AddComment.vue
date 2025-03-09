<script lang="ts">
const addComment = tv({
  slots: {
    base: "space-y-4",
    header: "flex items-center gap-2",
    avatar: "size-8 rounded-full",
    title: "text-lg font-semibold",
  },
});

export interface AddCommentProps {
  class?: any;
  ui?: Partial<typeof addComment.slots>;
}
export interface AddCommentEmits {}
export interface AddCommentSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<AddCommentProps>();
defineEmits<AddCommentEmits>();
defineSlots<AddCommentSlots>();

const { state: userState } = useUser();

const loginUrl = `${import.meta.env.VITE_API_URL}/auth/github/redirect`;

const ui = computed(() => addComment());
</script>

<template>
  <div :class="ui.base({ class: [props.class, props.ui?.base] })">
    <div :class="ui.header({ class: props.ui?.header })">
      <img
        v-if="userState.data && userState.data.avatar"
        :src="userState.data.avatar"
        :class="ui.avatar({ class: props.ui?.avatar })"
      />
      <h3 :class="ui.title({ class: props.ui?.title })">Add a comment</h3>
    </div>

    <CommentForm v-if="userState.data" />
    <div v-else class="flex justify-center">
      <Button label="Login to comment" :href="loginUrl" />
    </div>
  </div>
</template>
