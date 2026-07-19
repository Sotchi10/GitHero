import styles from "./ModuleCard.module.css";

function ModuleCard({ module = {}, isSelected = false, onClick = () => {}, onContinue = () => {} }) {
  const {
    module_id = 0,
    title = "Untitled module",
    description = "No description available.",
    published_lessons = 0,
    completed_lessons = 0,
    progress_percent = 0,
    next_lesson_id,
    difficulty = "",
    estimated_minutes,
  } = module;

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <div className={styles.lessonNum}>{String(module_id).padStart(2, "0")}</div>
      </div>

      <div className={styles.cardBody}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.codePreview}>
        <span className={styles.previewCode}>{difficulty || "Module"}</span>
        <span className={styles.previewLine1}>{estimated_minutes ? `${estimated_minutes} minutes` : "Self-paced"}</span>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.topicCount}>
          {completed_lessons}/{published_lessons} lessons · {progress_percent}%
        </span>
        {published_lessons > 0 && next_lesson_id && (
          <button
            type="button"
            className={styles.pdfBtn}
            onClick={(event) => {
              event.stopPropagation();
              onContinue(module);
            }}
          >
            Continue learning
          </button>
        )}
      </div>
    </div>
  );
}

export default ModuleCard;
