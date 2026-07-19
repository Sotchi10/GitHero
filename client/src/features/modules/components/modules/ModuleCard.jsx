import styles from "./ModuleCard.module.css";

function ModuleCard({ module = {}, isSelected = false, onClick = () => {} }) {
  const {
    module_id = 0,
    title = "Untitled module",
    description = "No description available.",
    total_lessons = 0,
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
        <span className={styles.topicCount}>{total_lessons} lessons</span>
      </div>
    </div>
  );
}

export default ModuleCard;
