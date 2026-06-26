import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getPost } from "../../../api/apiCommunity";
import Avatar from "../../profile/components/Avatar";
import DashSideBarRight from "../../../layouts/dashboardlayout/DashSideBarRight";


const formatDate = (value) => {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const Article = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getPost(id)
      .then((res) => {
        if (!active) return;
        setPost(res.data);
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || "Failed to load article");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <p className="p-8 text-sm text-gray-400">Loading article...</p>;
  }

  if (error) {
    return <p className="p-8 text-sm text-red-400">{error}</p>;
  }

  if (!post) {
    return <p className="p-8 text-sm text-gray-400">Article not found.</p>;
  }

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
    <section className="min-h-full bg-[#080808] px-4 py-8 text-[#e0e0e0]">
      <div className=" flex-1 overflow-hidden mt-2">
        <main className="h-full overflow-y-auto px-5">
          <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
            <article className="w-full mx-auto max-w-3xl">
              <h2 className="text-3xl font-semibold text-white">
                {post.title}
              </h2>

              <div className="w-full  mt-5 flex items-center gap-3 border-b border-[#242424] pb-5">
                <NavLink to={profilePath} aria-label={`${displayName} profile`}>
                  <Avatar profile={author} size="md" />
                </NavLink>

                <div>
                  <NavLink
                    to={profilePath}
                    className="text-sm font-medium text-white hover:underline"
                  >
                    {displayName}
                  </NavLink>
                  <p className="text-[13px] text-gray-400">
                    @{post.username} - {formatDate(post.created_at)}
                  </p>
                </div>
              </div>

              <div className="mt-6 whitespace-pre-wrap text-[14px] leading-7 text-gray-200">
                {post.content}
              </div>
            </article>

            <DashSideBarRight title="Community" link="Read other article" />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Article;
