import { Comment } from "@/comments/types/comment";

export const useComments = defineQuery(() => {
  const { frontmatter } = useData();

  return useQuery<Comment[]>({
    key: () => ["comments", frontmatter.value.id],
    query: () =>
      fetchComments(frontmatter.value.id).then((response) => response.data),
    enabled: typeof document !== "undefined",
  });
});
