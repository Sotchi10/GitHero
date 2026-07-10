import { useState } from "react";

const RepoCreate = ({ onClose, onCreate, saving = false, error = "" }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    visibility: "public",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (saving) return;

    onCreate(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-6 rounded-lg w-[400px] border border-[#242424]"
      >
        <h2 className="text-lg font-semibold mb-4">Create Repository</h2>

        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Repository name"
          className="w-full mb-3 p-2 bg-[#1a1a1a] border border-[#333] rounded"
          maxLength={100}
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-3 p-2 bg-[#1a1a1a] border border-[#333] rounded"
          maxLength={500}
        />

        <select
          name="visibility"
          value={form.visibility}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-[#1a1a1a] border border-[#333] rounded"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-600 rounded cursor-pointer"
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 rounded cursor-pointer disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default RepoCreate;
