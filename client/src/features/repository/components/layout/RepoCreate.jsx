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
        className="w-400px rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-[#242424] dark:bg-[#111]"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create Repository</h2>

        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Repository name"
          className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-[#333] dark:bg-[#1a1a1a] dark:text-white"
          maxLength={100}
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-[#333] dark:bg-[#1a1a1a] dark:text-white"
          maxLength={500}
        />

        <select
          name="visibility"
          value={form.visibility}
          onChange={handleChange}
          className="mb-4 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-[#333] dark:bg-[#1a1a1a] dark:text-white"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        {error && <p className="mb-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded bg-gray-200 px-3 py-1 text-gray-900 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-500 disabled:opacity-60"
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
