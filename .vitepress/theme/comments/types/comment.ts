import type { User } from "@/user/types/user";

export interface Comment {
  id: number;
  content: string;
  author: User;

  can: {
    update: boolean;
    delete: boolean;
  };
}
