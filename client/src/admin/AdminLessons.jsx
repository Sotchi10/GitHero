import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaEye, FaPlus, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import {
  createLesson,
  deleteLesson,
  getAdminModules,
  getLessons,
  removeLessonPdf,
  updateLesson,
  uploadLessonPdf,
} from "../api/apiModule";

const emptyLesson = {
  module_id: "",
  title: "",
  description: "",
  content: "",
  code_example: "",
  example_output: "",
  display_order: "",
  estimated_minutes: "",
};
const errorMessage = (err, fallback) => err.response?.data?.message || fallback;

const AdminLessons = () => {
  const [searchParams] = useSearchParams();
  const [lessons, setLessons] = useState([]);
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({
    ...emptyLesson,
    module_id: searchParams.get("moduleId") || "",
  });
  const [editingId, setEditingId] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [lessonRes, moduleRes] = await Promise.all([
        getLessons(),
        getAdminModules(),
      ]);
      setLessons(lessonRes.data);
      setModules(moduleRes.data);
    } catch (err) {
      setError(errorMessage(err, "Failed to load lessons"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedModuleId = searchParams.get("moduleId");
  const visibleLessons = useMemo(
    () =>
      selectedModuleId
        ? lessons.filter(
            (lesson) => String(lesson.module_id) === selectedModuleId,
          )
        : lessons,
    [lessons, selectedModuleId],
  );

  const resetForm = () => {
    setForm({ ...emptyLesson, module_id: selectedModuleId || "" });
    setEditingId(null);
    setPdfFile(null);
  };

  const saveLesson = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      const data = {
        ...form,
        module_id: Number(form.module_id),
        display_order: Number(form.display_order),
        estimated_minutes: Number(form.estimated_minutes) || null,
      };
      const res = editingId
        ? await updateLesson(editingId, data)
        : await createLesson(data);
      const lessonId = editingId || res.data.lesson_id;
      if (pdfFile) await uploadLessonPdf(lessonId, pdfFile);
      resetForm();
      await loadData();
    } catch (err) {
      setError(errorMessage(err, "Failed to save lesson"));
    } finally {
      setSaving(false);
    }
  };

  const editLesson = (lesson) => {
    setViewing(null);
    setEditingId(lesson.lesson_id);
    setPdfFile(null);
    setForm({
      module_id: String(lesson.module_id),
      title: lesson.title || "",
      description: lesson.description || "",
      content: lesson.content || "",
      code_example: lesson.code_example || "",
      example_output: lesson.example_output || "",
      display_order: lesson.display_order ?? "",
      estimated_minutes: lesson.estimated_minutes || "",
    });
  };

  const removePdf = async (lesson) => {
    if (!window.confirm(`Remove the PDF for “${lesson.title}”?`)) return;
    try {
      setError("");
      await removeLessonPdf(lesson.lesson_id);
      await loadData();
    } catch (err) {
      setError(errorMessage(err, "Failed to remove lesson PDF"));
    }
  };

  const removeLesson = async (lesson) => {
    if (!window.confirm(`Delete “${lesson.title}”?`)) return;
    try {
      setError("");
      await deleteLesson(lesson.lesson_id);
      await loadData();
    } catch (err) {
      setError(errorMessage(err, "Failed to delete lesson"));
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-normal text-gray-400">
            Lesson manager
          </p>
          <h1 className="mt-2 text-3xl font-bold">Lessons</h1>
        </div>
        <button
          onClick={resetForm}
          className="inline-flex items-center gap-2 rounded-lg bg-btn-primary px-5 py-2 text-sm font-semibold hover:bg-btn-primary-hover"
        >
          <FaPlus />
          Add lesson
        </button>
      </header>
      {error && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}
      <form
        onSubmit={saveLesson}
        className="grid gap-3 rounded-lg border border-default p-5 md:grid-cols-2"
      >
        <h2 className="md:col-span-2 text-lg font-semibold">
          {editingId ? "Edit lesson" : "Create lesson"}
        </h2>
        <select
          required
          value={form.module_id}
          onChange={(e) => setForm({ ...form, module_id: e.target.value })}
          className="rounded-lg border border-default p-3 text-sm text-white outline-none cursor-pointer"
        >
          <option value="" className="bg-black text-gray-400 cursor-pointer">
            Select module
          </option>

          {modules.map((module) => (
            <option
              key={module.module_id}
              value={module.module_id}
              className="bg-black text-white cursor-pointer"
            >
              {module.title}
            </option>
          ))}
        </select>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Lesson title"
          className="rounded-lg border border-default bg-transparent p-3 text-sm outline-none"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="min-h-20 rounded-lg border border-default bg-transparent p-3 text-sm outline-none md:col-span-2"
        />
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Lesson content"
          className="min-h-28 rounded-lg border border-default bg-transparent p-3 text-sm outline-none md:col-span-2"
        />
        <textarea
          value={form.code_example}
          onChange={(e) => setForm({ ...form, code_example: e.target.value })}
          placeholder="Code example"
          className="min-h-20 rounded-lg border border-default bg-transparent p-3 font-mono text-sm outline-none"
        />
        <textarea
          value={form.example_output}
          onChange={(e) => setForm({ ...form, example_output: e.target.value })}
          placeholder="Example output"
          className="min-h-20 rounded-lg border border-default bg-transparent p-3 font-mono text-sm outline-none"
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
        <label className="cursor-pointer rounded-lg border border-default p-3 text-sm text-gray-300">
          Upload Lesson File
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.size > 10 * 1024 * 1024) {
                setError("PDF file must be 10 MB or smaller");
                e.target.value = "";
                return;
              }
              setPdfFile(file || null);
            }}
            className="mt-2 block w-full text-sm"
          />
        </label>
        <div className="flex gap-3 md:col-span-2">
          <button
            disabled={saving}
            className="rounded-lg bg-btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update lesson"
                : "Create lesson"}
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
      {viewing && (
        <section className="rounded-lg border border-default bg-surface p-5">
          <div className="flex justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">{viewing.title}</h2>
              <p className="mt-1 text-sm text-gray-400">
                {viewing.module_title} · Order {viewing.display_order}
              </p>
            </div>
            <button
              onClick={() => setViewing(null)}
              className="text-sm text-gray-400"
            >
              Close
            </button>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm text-gray-300">
            {viewing.content || viewing.description || "No lesson content."}
          </p>
        </section>
      )}
      {loading ? (
        <div className="p-6 text-gray-400">Loading lessons...</div>
      ) : (
        <section className="overflow-x-auto rounded-lg border border-default">
          <div className="min-w-180">
            <div className="grid grid-cols-[1.2fr_1fr_.7fr_.9fr] border-b border-default px-5 py-3 text-xs uppercase text-gray-400">
              <span>Lesson</span>
              <span>Module</span>
              <span>Order</span>
              <span className="text-right">Actions</span>
            </div>
            {visibleLessons.map((lesson) => (
              <div
                key={lesson.lesson_id}
                className="grid grid-cols-[1.2fr_1fr_.7fr_.9fr] items-center border-b border-[#242424] px-5 py-4 last:border-b-0"
              >
                <p className="text-sm font-medium leading-6">
                  {lesson.title}
                  {lesson.pdf_url && (
                    <span className="ml-2 text-xs text-gray-400">
                      PDF attached
                    </span>
                  )}
                </p>
                <p className="text-sm leading-6 text-gray-400">
                  {lesson.module_title}
                </p>
                <p className="text-sm leading-6 text-gray-400">
                  {lesson.display_order}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setViewing(lesson)}
                    className="rounded-lg border border-default p-2 hover:bg-[#161616]"
                    aria-label="View lesson"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => editLesson(lesson)}
                    className="rounded-lg border border-default p-2 hover:bg-[#161616]"
                    aria-label="Edit lesson"
                  >
                    <FaRegEdit />
                  </button>
                  {lesson.pdf_url && (
                    <button
                      onClick={() => removePdf(lesson)}
                      className="rounded-lg border border-default px-2 text-xs hover:bg-[#161616]"
                    >
                      Remove PDF
                    </button>
                  )}
                  <button
                    onClick={() => removeLesson(lesson)}
                    className="rounded-lg border border-red-900/70 p-2 text-red-300 hover:bg-red-950/30"
                    aria-label="Delete lesson"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
            {!visibleLessons.length && (
              <p className="p-5 text-sm text-gray-400">No lessons found.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminLessons;
