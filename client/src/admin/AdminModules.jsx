import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaRegEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import {
  createModule,
  deleteModule,
  getAdminModules,
  updateModule,
} from "../api/apiModule";

const emptyModule = {
  title: "",
  description: "",
  difficulty: "",
  estimated_minutes: "",
  display_order: "",
  is_published: false,
};
const errorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

const AdminModules = () => {
  const [query, setQuery] = useState("");
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState(emptyModule);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadModules = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAdminModules();
      setModules(res.data);
    } catch (err) {
      setError(errorMessage(err, "Failed to load modules"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModules();
  }, []);

  const filteredModules = useMemo(
    () =>
      modules.filter((module) =>
        module.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [modules, query],
  );

  const resetForm = () => {
    setForm(emptyModule);
    setEditingId(null);
  };

  const saveModule = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      const data = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        difficulty: form.difficulty || null,
        estimated_minutes:
          form.estimated_minutes === "" ? null : Number(form.estimated_minutes),
        display_order: Number(form.display_order),
        is_published: Boolean(form.is_published),
      };
      if (editingId) await updateModule(editingId, data);
      else await createModule(data);
      resetForm();
      await loadModules();
    } catch (err) {
      setError(errorMessage(err, "Failed to save module"));
    } finally {
      setSaving(false);
    }
  };

  const editModule = (module) => {
    setEditingId(module.module_id);
    setForm({
      title: module.title || "",
      description: module.description || "",
      difficulty: module.difficulty || "",
      estimated_minutes: module.estimated_minutes || "",
      display_order: module.display_order ?? "",
      is_published: Boolean(module.is_published),
    });
  };

  const removeModule = async (module) => {
    if (!window.confirm(`Delete “${module.title}”? Remove its lessons first.`))
      return;
    try {
      setError("");
      await deleteModule(module.module_id);
      await loadModules();
    } catch (err) {
      setError(errorMessage(err, "Failed to delete module"));
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-normal text-gray-400">
            Content library
          </p>
          <h1 className="mt-2 text-3xl font-bold">Modules</h1>
        </div>
        <button
          onClick={resetForm}
          className="inline-flex items-center gap-2 rounded-lg bg-btn-primary px-5 py-2 text-sm font-semibold hover:bg-btn-primary-hover"
        >
          <FaPlus />
          Add module
        </button>
      </header>

      {error && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={saveModule}
        className="grid gap-3 rounded-lg border border-default p-5 md:grid-cols-2"
      >
        <h2 className="md:col-span-2 text-lg font-semibold">
          {editingId ? "Edit module" : "Create module"}
        </h2>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="rounded-lg border border-default bg-transparent p-3 text-sm outline-none"
        />
        <input
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
          placeholder="Difficulty"
          className="rounded-lg border border-default bg-transparent p-3 text-sm outline-none"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="min-h-24 rounded-lg border border-default bg-transparent p-3 text-sm outline-none md:col-span-2"
        />
        <input
          type="number"
          min="0"
          value={form.estimated_minutes}
          onChange={(e) =>
            setForm({ ...form, estimated_minutes: e.target.value })
          }
          placeholder="Estimated minutes"
          className="rounded-lg border border-default bg-transparent p-3 text-sm outline-none"
        />
        <input
          required
          type="number"
          min="0"
          value={form.display_order}
          onChange={(e) => setForm({ ...form, display_order: e.target.value })}
          placeholder="Display order"
          className="rounded-lg border border-default bg-transparent p-3 text-sm outline-none"
        />
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) =>
              setForm({ ...form, is_published: e.target.checked })
            }
          />{" "}
          Published
        </label>
        <div className="flex gap-3 md:col-span-2">
          <button
            disabled={saving}
            className="rounded-lg bg-btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update module"
                : "Create module"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-default px-4 py-2 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex max-w-md items-center gap-3 rounded-lg border border-default  px-4 py-2">
        <FaSearch className="text-sm text-gray-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search modules"
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
        />
      </div>
      {loading ? (
        <div className="p-6 text-gray-400">Loading modules...</div>
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredModules.map((module) => (
            <article
              key={module.module_id}
              className="rounded-lg border border-default  p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{module.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Order {module.display_order}
                  </p>
                </div>
                <span className="rounded-lg border border-[#242424] px-3 py-1 text-xs text-gray-300">
                  {module.is_published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    navigate(`/admin/lessons?moduleId=${module.module_id}`)
                  }
                  className="rounded-lg border border-default px-3 py-2 text-sm hover:bg-[#161616]"
                >
                  Manage lessons
                </button>
                <button
                  onClick={() => editModule(module)}
                  className="inline-flex items-center gap-2 rounded-lg border border-default px-3 py-2 text-sm hover:bg-[#161616]"
                >
                  <FaRegEdit />
                  Edit
                </button>
                <button
                  onClick={() => removeModule(module)}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-900/70 px-3 py-2 text-sm text-red-300 hover:bg-red-950/30"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </div>
            </article>
          ))}
          {!filteredModules.length && (
            <p className="text-gray-400">No modules found.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default AdminModules;
