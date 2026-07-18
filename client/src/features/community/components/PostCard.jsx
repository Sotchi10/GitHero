import { NavLink } from "react-router-dom";
import Avatar from "../../profile/components/Avatar";

const formatDate = (value) => {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const getDaysAgo = (createdAt) => {
  if (!createdAt) return "";

  const days = Math.floor(
    (Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24),
  );

  return days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`;
};

const getPreview = (content = "") => {
  if (content.length <= 180) return content;
  return `${content.slice(0, 180).trim()}...`;
};

const PostCard = ({ post }) => {
  const postId = post.id || post.post_id;
  const author = {
    avatar: post.avatar,
    full_name: post.full_name,
    first_name: post.first_name,
    last_name: post.last_name,
    username: post.username,
  };
  const displayName = post.full_name || post.username || "Unknown author";
  const profilePath = post.username
    ? `/profile/${post.username}`
    : "/community";

  return (
    <article className="flex flex-col gap-4 rounded border border-gray-200 bg-white p-5 shadow-sm dark:border-[#242424] dark:bg-[#0d0d0d]">
  <div className="flex items-center gap-3">
    <NavLink to={profilePath} aria-label={`${displayName} profile`}>
      <Avatar profile={author} size="sm" />
    </NavLink>

    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-x-2">
        <NavLink
          to={profilePath}
          className="text-[13px] font-medium text-gray-900 hover:underline dark:text-gray-100"
        >
          {displayName}
        </NavLink>

        <p className="text-[13px] text-gray-500 dark:text-gray-400">
          made a post
        </p>
      </div>

      <p className="text-[12px] text-gray-500 dark:text-gray-500">
        @{post.username}
      </p>
    </div>
  </div>

  <div className="space-y-2">
    <h5 className="text-[14px] font-semibold text-gray-900 dark:text-white">
      {post.title}
    </h5>

    <p className="text-[13px] leading-6 text-gray-700 dark:text-gray-300">
      {getPreview(post.content)}
    </p>
  </div>

  <div className="flex justify-between gap-4">
    <NavLink
      to={postId ? `/${post.username}/post/${postId}` : "/community"}
      className="text-[13px] text-blue-600 hover:underline dark:text-blue-500"
    >
      Read More
    </NavLink>

    <p className="text-[12px] text-gray-500 dark:text-gray-500">
      {getDaysAgo(post.created_at)}
    </p>
  </div>
</article>
  );
};
export default PostCard;
