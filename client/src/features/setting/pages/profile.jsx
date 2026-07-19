import { useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ProfileLoading from "./profileloading.jsx";
import ProfileSidebar from "./profilesidebar.jsx";
import ProfileForm from "./Profileform.jsx";

const buildFormFromProfile = (profile) => ({
  first_name: profile.first_name || "",
  last_name: profile.last_name || "",
  username: profile.username || "",
  bio: profile.bio || "",
  description: profile.description || "",
});

const Profile = () => {
  const { authUser, profile, updateProfile } = useAuth();
  const [draftForm, setDraftForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const form = draftForm ?? buildFormFromProfile(profile);

  const initialsSource = useMemo(() => {
    if (!profile) return "";

    return [profile.first_name, profile.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();
  }, [profile]);

  const hasChanges = useMemo(() => {
    if (!profile) return false;

    return Object.entries(form).some(([key, value]) => {
      const currentValue = profile[key] || "";
      return String(value).trim() !== String(currentValue).trim();
    });
  }, [form, profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraftForm((current) => ({
      ...(current ?? buildFormFromProfile(profile)),
      [name]: value,
    }));
    setMessage("");
    setError("");
  };

  const handleReset = () => {
    if (!profile) return;

    setDraftForm(null);
    setMessage("");
    setError("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!profile || saving || !hasChanges) return;

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        username: form.username.trim(),
        bio: form.bio.trim(),
        description: form.description.trim(),
      };

      await updateProfile(payload);
      setDraftForm(null);
      setMessage("Profile settings saved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save profile settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return <ProfileLoading />;
  }

  const displayName =
    [form.first_name, form.last_name].filter(Boolean).join(" ").trim() ||
    form.username;
  const roleLabel = authUser?.role || profile.role || "member";

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-primary text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0),transparent_34%),radial-gradient(circle_at_10%_20%,rgba(0,0,0,0),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)]" />

      <div className="relative grid gap-6 p-5 sm:p-8 xl:grid-cols-[360px_minmax(0,1fr)]">
        <ProfileSidebar
          profile={profile}
          authUser={authUser}
          form={form}
          displayName={displayName}
          initialsSource={initialsSource}
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
        />
      </div>
    </section>
  );
};

export default Profile;
