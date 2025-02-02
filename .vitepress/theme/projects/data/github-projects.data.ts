import type { Project } from "@/projects/types/project";
import { Octokit } from "octokit";
import { join } from "path";
import { loadEnv } from "vitepress";

declare const data: {
  title: string;
  projects: Project[];
}[];
export { data };

export default {
  async load() {
    const projects = [
      {
        title: "Website",
        projects: ["barbapapazes/orion"],
      },
      {
        title: "Nuxt Modules",
        projects: [
          "barbapapazes/nuxt-authorization",
          "barbapapazes/nuxt-payload-analyzer",
        ],
      },
      {
        title: "Nuxt Templates",
        projects: [
          "barbapapazes/gavarnie",
          "barbapapazes/slantire",
          "barbapapazes/the-green-chronicle",
        ],
      },
      {
        title: "Tools",
        projects: ["barbapapazes/utils-ai"],
      },
    ];

    const env = loadEnv("", join(process.cwd(), "src"));
    const octokit = new Octokit({ auth: env.VITE_GITHUB_TOKEN });

    const loadedProjects = await Promise.all(
      projects.map(async (project) => {
        const projects = await Promise.all(
          project.projects.map(async (project) => {
            const [owner, repo] = project.split("/");

            try {
              const { data } = await octokit.rest.repos.get({
                owner,
                repo,
              });

              return {
                name: project,
                description: data.description,
                url: data.html_url,
              } satisfies Project;
            } catch (error) {
              console.error(error);
              return null;
            }
          }),
        );

        return { ...project, projects };
      }),
    );

    return loadedProjects;
  },
};
