import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getModuleById, getModuleLessons } from "../../../api/apiModule";

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadErrors, setDownloadErrors] = useState({});
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const loadModule = async () => {
      try {
        const [moduleRes, lessonsRes] = await Promise.all([
          getModuleById(moduleId),
          getModuleLessons(moduleId),
        ]);
        setModule(moduleRes.data);
        setLessons(lessonsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load module");
      } finally {
        setLoading(false);
      }
    };
    loadModule();
  }, [moduleId]);

  const downloadUrl = (pdfUrl) =>
    pdfUrl.startsWith("http")
      ? pdfUrl
      : `${import.meta.env.VITE_API_URL?.replace(/\/$/, "") || ""}${pdfUrl}`;
  const downloadName = (lesson) => {
    const title =
      lesson.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "lesson";
    return `${String(lesson.display_order).padStart(2, "0")}-${title}.pdf`;
  };

  const downloadLessonPdf = async (lesson) => {
    try {
      setDownloadErrors((current) => ({ ...current, [lesson.lesson_id]: "" }));
      setDownloadingId(lesson.lesson_id);

      const token = localStorage.getItem("authToken");
      const response = await fetch(downloadUrl(lesson.pdf_url), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!response.ok) throw new Error(`Download failed (${response.status})`);

      const blob = await response.blob();
      const filename = downloadName(lesson);

      if ("showSaveFilePicker" in window) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [
            {
              description: "PDF document",
              accept: { "application/pdf": [".pdf"] },
            },
          ],
        });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        const temporaryUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = temporaryUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(temporaryUrl);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setDownloadErrors((current) => ({
          ...current,
          [lesson.lesson_id]: err.message || "Failed to download lesson PDF",
        }));
      }
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading)
    return <div className="p-6 text-gray-400">Loading module...</div>;
  if (error)
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
        <button
          onClick={() => navigate("/modules")}
          className="mt-4 text-sm underline "
        >
          Back to modules
        </button>
      </div>
    );

  return (
    <div className="w-full px-10 space-y-6">
      <button
        onClick={() => navigate("/modules")}
        className="text-sm text-blue-500 cursor-pointer hover:underline"
      >
        Back to modules
      </button>
      <header className="rounded-lg border border-default p-6">
        <p className="text-sm text-gray-400">
          {module.difficulty || "Module"} · {module.estimated_minutes || 0}{" "}
          minutes
        </p>
        <h1 className="mt-2 text-3xl font-bold">{module.title}</h1>
        <p className="mt-3 whitespace-pre-wrap text-gray-300">
          {module.description || "No description available."}
        </p>
      </header>
      <section className="rounded-lg border border-default ">
        <div className="border-b border-default p-5">
          <h2 className="text-xl font-semibold">Lessons</h2>
        </div>
        {lessons.length ? (
          lessons.map((lesson) => (
            <article
              key={lesson.lesson_id}
              className="border-b border-default p-5 last:border-b-0"
            >
              <p className="text-sm text-gray-400">
                Lesson {lesson.display_order} · {lesson.estimated_minutes || 0}{" "}
                minutes
              </p>
              <h3 className="mt-1 text-lg font-semibold">{lesson.title}</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm text-gray-300">
                {lesson.description ||
                  lesson.content ||
                  "No description available."}
              </p>
              {lesson.pdf_url && (
                <button
                  type="button"
                  onClick={() => downloadLessonPdf(lesson)}
                  disabled={downloadingId === lesson.lesson_id}
                  className="mt-4 inline-flex rounded-lg border border-default px-3 py-2 text-sm cursor-pointer  hover:bg-[#161616] disabled:opacity-60"
                >
                  {downloadingId === lesson.lesson_id
                    ? "Downloading..."
                    : "Download"}
                </button>
              )}
              {downloadErrors[lesson.lesson_id] && (
                <p className="mt-3 text-sm text-red-400">
                  {downloadErrors[lesson.lesson_id]}
                </p>
              )}
            </article>
          ))
        ) : (
          <p className="p-5 text-gray-400">
            No lessons are available for this module.
          </p>
        )}
      </section>
    </div>
  );
};

export default ModuleDetail;
