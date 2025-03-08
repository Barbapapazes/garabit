import { User } from "@/user/types/user";

export const useLogoutUser = defineMutation(() => {
  const queryCache = useQueryCache();

  return useMutation({
    mutation: () => postLogoutUser(),

    onMutate: () => {
      const oldUser = queryCache.getQueryData<User>(["user"]);

      queryCache.setQueryData(["user"], null);
      queryCache.cancelQueries({ key: ["user"], exact: true });

      return { oldUser };
    },
    onError: (_, __, { oldUser }) => {
      if (oldUser) {
        queryCache.setQueryData(["user"], oldUser);
      }
    },
    onSettled: () =>
      queryCache.invalidateQueries({ key: ["user"], exact: true }),
  });
});
