import { useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ProfileSummaryCard from "./ProfileSummaryCard.jsx";
import ProfileForm from "./ProfileForm.jsx";

const buildFormFromProfile = (profile) => ({
  first_name: profile.first_name || "",
  last_name: profile.last_name || "",
  username: profile.username || "",
  bio: profile.bio || "",
  description: profile.description || "",
});

const ProfilePanel = () => {
  const { authUser, profile, updateProfile } = useAuth();
  const [draftForm, setDraftForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const form = draftForm ?? (profile ? buildFormFromProfile(profile) : null);

  const hasChanges = useMemo(() => {
    if (!profile || !form) return false;
    return Object.entries(form).some(
      ([key, value]) => String(value).trim() !== String(profile[key] || "").trim(),
    );
  }, [form, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraftForm((current) => ({
      ...(current ?? buildFormFromProfile(profile)),
      [name]: value,
    }));
    setMessage("");
    setError("");
  };

  const handleReset = () => {
    setDraftForm(null);
    setMessage("");
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!profile || saving || !hasChanges) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");
      await updateProfile({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        username: form.username.trim(),
        bio: form.bio.trim(),
        description: form.description.trim(),
      });
      setDraftForm(null);
      setMessage("Profile settings saved.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile settings.");
    } finally {
      setSaving(false);
    }
  };

  if (!profile || !form) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-gray-400 dark:text-white/45">
        Loading profile...
      </div>
    );
  }

  const displayName =
    [form.first_name, form.last_name].filter(Boolean).join(" ").trim() || form.username;
  const roleLabel = authUser?.role || profile.role || "member";

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <ProfileSummaryCard
        profile={profile}
        displayName={displayName}
        roleLabel={roleLabel}
      />
      <ProfileForm
        form={form}
        hasChanges={hasChanges}
        saving={saving}
        message={message}
        error={error}
        onChange={handleChange}
        onReset={handleReset}
        onSave={handleSave}
        displayName={displayName}
        roleLabel={roleLabel}
      />
    </div>
  );
};

export default ProfilePanel;