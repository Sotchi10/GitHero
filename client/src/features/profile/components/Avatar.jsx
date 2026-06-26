import { getAvatarUrl, getInitials } from "../../../utils/avatar";

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-16 h-16 text-lg",
  xl: "w-28 h-28 text-3xl",
  "2xl": "w-80 h-80 text-6xl",
};

const Avatar = ({ profile, size = "md", className = "" }) => {
  const avatarUrl = getAvatarUrl(profile?.avatar);
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={profile?.username ? `${profile.username} avatar` : "User avatar"}
        className={`${sizeClass} rounded-full object-cover bg-gray-700 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-[#242424] text-gray-200 flex items-center justify-center font-semibold ${className}`}
    >
      {getInitials(profile)}
    </div>
  );
};

export default Avatar;
