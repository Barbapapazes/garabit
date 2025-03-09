export const fetchComments = (postId: number) =>
  api(`api/posts/${postId}/comments`);

export const postComment = (postId: number, content: string) =>
  api(`api/posts/${postId}/comments`, {
    method: "POST",
    body: { content },
  });

export const putComment = (commentId: number, content: string) =>
  api(`api/comments/${commentId}`, {
    method: "PUT",
    body: { content },
  });
export const deleteComment = (commentId: number) =>
  api(`api/comments/${commentId}`, {
    method: "DELETE",
  });
