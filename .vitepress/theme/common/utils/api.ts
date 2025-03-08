import { ofetch } from "ofetch";

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
  credentials: "include",
  onRequest: async ({ options }) => {
    const method = options.method?.toUpperCase() || "GET";

    if (["GET", "HEAD", "OPTIONS"].includes(method)) {
      return;
    }

    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      await ofetch("/sanctum/csrf-cookie", {
        baseURL: import.meta.env.VITE_API_URL,
        credentials: "include",
      });
    }

    options.headers.set(
      "X-Xsrf-Token",
      decodeURIComponent(getCookie("XSRF-TOKEN") || ""),
    );
  },
});

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}
