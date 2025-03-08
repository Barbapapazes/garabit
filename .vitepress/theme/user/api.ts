export const fetchUser = () => api("api/user");

export const postLogoutUser = () => api("logout", { method: "POST" });
