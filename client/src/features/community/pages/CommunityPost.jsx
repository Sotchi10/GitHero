import DashSideBarRight from "./../../../layouts/dashboardlayout/DashSideBarRight";
import PostCard from "./../components/PostCard";
import { useEffect, useState } from "react";
import { createPost, deletePost, getPosts } from "../../../api/apiCommunity";
import { useAuth } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";

const CommunityPost = () => {
  const { authUser, profile } = useAuth();
  const currentUserId = profile?.user_id || authUser?.user_id;
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
        setPosts(res.data);
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

  const handleDeletePost = async (postId) => {
    if (!postId || !currentUserId) return;
    if (!window.confirm("Delete this post?")) return;

    try {
      setError("");
      await deletePost(postId, currentUserId);
      setPosts((prev) =>
        prev.filter((post) => String(post.id || post.post_id) !== String(postId)),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete post");
    }
  };

  return (
    <>
      <section className="flex min-h-full flex-col bg-white px-4 py-8 text-gray-900 dark:bg-[#080808] dark:text-[#e0e0e0]">

        <div className=" flex-1 overflow-hidden mt-5">
          <main className="h-full overflow-y-auto bg-white px-5 dark:bg-[#080808]">
            <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
              {/* Left Content */}

              <div className="space-y-5">
                <div className="flex items-center justify-between text-[13px] text-gray-900 dark:text-gray-100">
                  <h4>Posts</h4>
                  {isDeveloper ? (
                    <>
                      <NavLink to="/community">
                        <button className="cursor-pointer rounded-[5px] bg-blue-600 px-2 py-1 text-white hover:bg-blue-700">
  Create Post
</button>
                      </NavLink>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}

                {loading ? (
                  <p className="text-sm text-gray-400">Loading posts...</p>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard
                      key={post.id || post.post_id}
                      post={post}
                      currentUserId={currentUserId}
                      onDelete={handleDeletePost}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No posts yet.</p>
                )}
              </div>

              <DashSideBarRight title="Developers" link="See more developers" />
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
export default CommunityPost;
