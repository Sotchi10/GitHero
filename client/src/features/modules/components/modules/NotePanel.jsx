import { useEffect, useState } from "react";
import styles from "./NotePanel.module.css";

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
    <aside className={`${styles.panel} ${compact ? styles.compactPanel : ""}`}>
      <div
        className={`${styles.panelHeader} ${compact ? styles.compactHeader : ""}`}
      >
        <span className={styles.panelTitle}>{title}</span>
        {resolvedLesson && (
          <span className={styles.lessonLabel}>
            Lesson {String(resolvedLesson.id).padStart(2, "0")}
          </span>
        )}
      </div>

      {!resolvedLessonId ? (
        <div className={styles.empty}>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <>
          <textarea
            className={`${styles.textarea} ${compact ? styles.compactTextarea : ""}`}
            placeholder={resolvedPlaceholder}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div
            className={`${styles.panelFooter} ${compact ? styles.compactFooter : ""}`}
          >
            <span className={styles.statusText}>
              {status === "saving" && "Saving…"}
              {status === "saved" && " Saved"}
              {status === "error" && " Failed to save"}
            </span>
            <button
              className={`${styles.saveBtn} ${compact ? styles.compactSaveBtn : ""}`}
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
