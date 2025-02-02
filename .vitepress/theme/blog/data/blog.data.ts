import type { ContentData } from "vitepress";
import { createContentLoader } from "vitepress";

declare const data: ContentData[];
export { data };

export default createContentLoader("blog/*.md", {
  transform: (data) => {
    return data.sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });
  },
});
