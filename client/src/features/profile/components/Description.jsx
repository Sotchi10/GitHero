import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updateCurrentProfile } from "../../../api/apiProfile";
import { useNavigate } from "react-router-dom";

const Description = ({ profile, canEdit = false }) => {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    description: profile?.description || "",
  });

  const resetForm = () => {
    setForm({
      description: profile?.description || "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profile?.user_id || saving || !canEdit) return;

    try {
      setSaving(true);
      setError("");

      const updatedData = {
        description: form.description.trim(),
      };

      const updatedProfile = await updateProfile(updatedData);
      console.log(updatedProfile);
      setIsEditing(false);

      if (
        updatedProfile?.username &&
        updatedProfile.username !== profile.username
      ) {
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
    if (!canEdit) return;

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
          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded border border-[#242424] bg-transparent p-2 text-sm"
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
        <div onClick={handleEdit} className={canEdit ? "cursor-pointer" : ""}>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">
                {profile.full_name || profile.username}
              </p>
              <div className="px-2 py-1 border rounded-[15px] border-[#242424]">
                <p className="text-[8px]">{profile.role}</p>
              </div>
            </div>
            <p className="text-[13px]">{profile.bio || "No Bio yet"}</p>
          </div>
          <hr className="mt-3 w-1/4" />
          <div className="mt-3 flex flex-col">
            <p>{profile.username}'s description</p>
            <p className="text-[13px]">
              {profile.description ||
                (canEdit
                  ? "Click to add your description..."
                  : "No description yet.")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
