const API_ORIGIN =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "").replace(/\/api$/, "") || "";

export const getAvatarUrl = (avatar) => {
  if (!avatar) return null;
  if (/^https?:\/\//i.test(avatar)) return avatar;
  return `${API_ORIGIN}${avatar.startsWith("/") ? avatar : `/${avatar}`}`;
};

export const getInitials = (profile) => {
  const name = profile?.full_name || `${profile?.first_name || ""} ${profile?.last_name || ""}`;
  const source = name.trim() || profile?.username || "?";

  return source
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};
