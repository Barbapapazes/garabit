import type { User } from "@/user/types/user";

export const useUser = defineQuery(() => {
  return useQuery<User>({
    key: ["user"],
    query: () => fetchUser().then((response) => response.data),
    enabled: typeof document !== "undefined",
  });
});
