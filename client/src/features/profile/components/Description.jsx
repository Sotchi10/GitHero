import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updatePfp } from "../../../api/apiProfile";
import { useNavigate } from "react-router-dom";

const Description = () => {
  const { profile, updateUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: profile?.username || "",
    bio: profile?.bio || "",
    description: profile?.description || "",
  });

  const resetForm = () => {
    setForm({
      username: profile?.username || "",
      bio: profile?.bio || "",
      description: profile?.description || "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profile?.user_id || saving) return;

    if (!form.username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const res = await updatePfp(profile.user_id, {
        username: form.username.trim(),
        bio: form.bio.trim(),
        description: form.description.trim(),
      });

      const updatedProfile = res.data.profile;

      updateUser(updatedProfile);
      setIsEditing(false);

      if (updatedProfile?.username && updatedProfile.username !== profile.username) {
        navigate(`/profile/${updatedProfile.username}`, { replace: true });
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setError("");
    setIsEditing(false);
  };

  const handleEdit = () => {
    resetForm();
    setError("");
    setIsEditing(true);
  };

  if (!profile) {
    return (
      <div className="w-full px-8 py-5 border border-default mt-4 rounded-[8px]">
        <p>Profile data is unavailable.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-5 border border-default mt-4 rounded-[8px]">
      {isEditing ? (
        <>
          {/* Username */}
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full bg-transparent border p-2 mb-2"
            placeholder="Username"
          />

          {/* Bio */}
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full bg-transparent border p-2 mb-2"
            placeholder="Short bio"
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-transparent border p-2"
            placeholder="Write your description..."
          />

          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-3 py-1 bg-green-600 rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={handleCancel}
              disabled={saving}
              className="px-3 py-1 bg-gray-500 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div onClick={handleEdit} className="cursor-pointer">
          <p className="font-semibold">{profile.username}</p>
          <p className="text-sm text-gray-300 mt-2">
            {profile.bio || "Click to add your bio..."}
          </p>
          <p className="mt-4">
            {profile.description || "Click to add your description..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Description;
