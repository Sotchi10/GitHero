import DashSideBarRight from "./../../../layouts/dashboardlayout/DashSideBarRight";
import PostCard from "./../components/PostCard";
import { useEffect, useState } from "react";
import { createPost, getPosts } from "../../../api/apiCommunity";
import { useAuth } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Community = () => {
  const { authUser, profile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isDeveloper = (authUser?.role || "").toLowerCase() === "developer";

  useEffect(() => {
    let active = true;

    getPosts()
      .then((res) => {
        if (!active) return;
        const limitedPosts = res.data.slice(0, 7);
        setPosts(limitedPosts);
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || "Failed to load posts");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDeveloper || saving) return;

    try {
      setSaving(true);
      setError("");
      const res = await createPost(
        {
          title: form.title,
          content: form.content,
        },
        profile.user_id,
      );

      setPosts([res.data.post, ...posts]);
      setForm({ title: "", content: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <section className="flex min-h-full flex-col bg-white px-4 py-8 text-gray-900 dark:bg-[#080808] dark:text-[#e0e0e0]">
        <h4>Feed</h4>
        <div className=" flex-1 overflow-hidden mt-5">
          <main className="h-full overflow-y-auto bg-white px-5 dark:bg-[#080808]">
            <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
              {/* Left Content */}
              <div className="space-y-5">
                {isDeveloper && (
                  <form
                    onSubmit={handleSubmit}
                    className="rounded border border-gray-200 bg-white p-5 shadow-sm dark:border-[#242424] dark:bg-[#0d0d0d]"
                  >
                    <h5 className="text-base font-semibold text-gray-900 dark:text-white">
                      Create Post
                    </h5>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Post title"
                      className="mt-4 w-full rounded border border-gray-300 bg-white px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-blue-500 dark:border-[#242424] dark:bg-[#080808] dark:text-white"
                      maxLength={150}
                      required
                    />
                    <textarea
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      placeholder="Share an article, tip, or update"
                      className="mt-3 min-h-32 w-full rounded border border-gray-300 bg-white px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-blue-500 dark:border-[#242424] dark:bg-[#080808] dark:text-white"
                      maxLength={10000}
                      required
                    />
                    <button
                      type="submit"
                      disabled={saving}
                      className="mt-3 cursor-pointer rounded bg-gray-200 px-4 py-2 text-sm text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 disabled:opacity-60"
                    >
                      {saving ? "Posting..." : "Post"}
                    </button>
                  </form>
                )}

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}

                {loading ? (
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Loading posts...
                  </p>
                ) : posts.length > 0 ? (
                  posts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    No posts yet.
                  </p>
                )}
                <div className="flex item-center w-full justify-end">
                  <NavLink
                    to="/community/posts"
                    className="text-[13px] text-blue-500"
                  >
                    <button className="cursor-pointer hover:underline">
                      See more
                    </button>
                  </NavLink>
                </div>
              </div>

              <DashSideBarRight title="Developers" link="See more developers" />
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
export default Community;
