import type { Comment } from "@/comments/types/comment";

export const useDeleteComment = defineMutation(() => {
  const { frontmatter } = useData();

  const queryCache = useQueryCache();

  return useMutation({
    mutation: ({ commentId }: { commentId: number }) =>
      deleteComment(commentId),

    onMutate: ({ commentId }) => {
      const oldComments =
        queryCache.getQueryData<Comment[]>([
          "comments",
          frontmatter.value.id,
        ]) || ([] as Comment[]);

      const newComments = JSON.parse(JSON.stringify(oldComments)) as Comment[];
      newComments.splice(
        newComments.findIndex((c) => c.id === commentId),
        1,
      );

      queryCache.setQueryData(["comments", frontmatter.value.id], newComments);
      queryCache.cancelQueries({
        key: ["comments", frontmatter.value.id],
        exact: true,
      });

      return { oldComments };
    },
    onError: (_, __, { oldComments }) => {
      if (oldComments) {
        queryCache.setQueryData(
          ["comments", frontmatter.value.id],
          oldComments,
        );
      }
    },
    onSettled: () =>
      queryCache.invalidateQueries({
        key: ["comments", frontmatter.value.id],
        exact: true,
      }),
  });
});
