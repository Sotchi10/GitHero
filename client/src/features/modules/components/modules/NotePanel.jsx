import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function getNoteByLesson(lessonId) {
  const res = await fetch(`${BASE_URL}/api/notes/${lessonId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch note");
  }

  return res.json();
}

async function saveNoteByLesson(lessonId, content) {
  const res = await fetch(`${BASE_URL}/api/notes/${lessonId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("Failed to save note");
  }

  return res.json();
}

function NotePanel({
  selectedLesson,
  compact = false,
  lessonId,
  title = "My Notes",
  emptyMessage = "Select a lesson to start taking notes.",
  placeholder,
}) {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");

  const resolvedLesson =
    selectedLesson ?? (lessonId ? { id: lessonId, title: title } : null);
  const resolvedLessonId = resolvedLesson?.id ?? lessonId;
  const resolvedPlaceholder =
    placeholder ??
    (resolvedLesson?.title
      ? `Write your notes for "${resolvedLesson.title}" here…`
      : "Write your notes here…");

  const resetNote = () => {
    window.setTimeout(() => {
      setNote("");
      setStatus("idle");
    }, 0);
  };

  useEffect(() => {
    if (!resolvedLessonId) {
      resetNote();
      return;
    }

    let isMounted = true;

    window.setTimeout(() => setStatus("idle"), 0);
    resetNote();

    getNoteByLesson(resolvedLessonId)
      .then((data) => {
        if (isMounted) {
          setNote(data?.content ?? "");
        }
      })
      .catch(() => {
        if (isMounted) {
          setNote("");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [resolvedLessonId]);

  const handleSave = async () => {
    if (!resolvedLessonId) return;

    setStatus("saving");

    try {
      await saveNoteByLesson(resolvedLessonId, note);
      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
    }
  };

  return (
    <aside
      className={
        compact
          ? "h-auto w-full self-start rounded-xl border border-gray-200 bg-white text-gray-900 shadow-none dark:border-[#2a2d30] dark:bg-[#0d0d0d] dark:text-[#e8eaed]"
          : "sticky top-0 flex h-[200px] w-[320px] flex-shrink-0 flex-col self-start rounded-lg border border-gray-200 bg-white text-gray-900 dark:border-[#242424] dark:bg-[#0d0d0d] dark:text-[#e8eaed]"
      }
    >
      <div
        className={
          compact
            ? "flex items-center justify-between border-b border-gray-200 px-3.5 pt-3.5 pb-2.5 dark:border-[#242424]"
            : "flex items-center justify-between border-b border-gray-200 px-[18px] pt-4 pb-3 dark:border-[#242424]"
        }
      >
        <span className="text-[13px] font-medium text-gray-900 dark:text-[#f2f5f8]">
          {title}
        </span>
        {resolvedLesson && (
          <span className="rounded-md border border-blue-200 bg-blue-50 px-[7px] py-0.5 font-mono text-[11px] text-blue-700 dark:border-[#2a4a7f] dark:bg-[#18212d] dark:text-[#7ab3f0]">
            Lesson {String(resolvedLesson.id).padStart(2, "0")}
          </span>
        )}
      </div>

      {!resolvedLessonId ? (
        <div className="flex flex-1 items-center justify-center px-6 py-6 text-center">
          <p className="text-xs leading-[1.6] text-gray-500 dark:text-[#8a9098]">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <>
          <textarea
            className={
              compact
                ? "mx-3 mt-2.5 min-h-[110px] rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-[13px] leading-[1.65] text-gray-900 outline-none placeholder:text-gray-400 dark:border-[#2a2d30] dark:bg-[#0d0f12] dark:text-[#e6e9ef] dark:placeholder:text-[#5b6470]"
                : "flex-1 resize-none border-none bg-transparent px-[18px] py-4 text-[13px] leading-[1.65] text-gray-900 caret-blue-600 outline-none placeholder:text-gray-400 dark:text-[#e6e9ef] dark:caret-[#7ab3f0] dark:placeholder:text-[#5b6470]"
            }
            placeholder={resolvedPlaceholder}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div
            className={
              compact
                ? "flex items-center justify-between border-t border-gray-200 px-3.5 pt-2.5 pb-3.5 dark:border-[#242424]"
                : "flex items-center justify-between border-t border-gray-200 px-[18px] py-3 dark:border-[#2a2d30]"
            }
          >
            <span className="min-w-[80px] text-[11px] text-gray-500 dark:text-[#8a9098]">
              {status === "saving" && "Saving…"}
              {status === "saved" && " Saved"}
              {status === "error" && " Failed to save"}
            </span>
            <button
              className={`rounded-md bg-blue-600 font-sans text-xs text-white transition-colors duration-150 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${
                compact ? "px-3 py-1.5" : "px-3.5 py-1.5"
              }`}
              onClick={handleSave}
              disabled={status === "saving"}
            >
              {status === "saving" ? "Saving…" : "Save note"}
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default NotePanel;