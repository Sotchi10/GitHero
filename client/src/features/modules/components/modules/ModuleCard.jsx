import styles from "./ModuleCard.module.css";

function ModuleCard({ module = {}, isSelected = false, onClick = () => {} }) {
  const {
    id = 0,
    title = "Untitled lesson",
    description = "No description available.",
    topics = 0,
    previewCode = "",
    previewLine1 = "",
    previewLine2 = "",
    pdfUrl = "#",
  } = module;

  const resolvedPdfUrl =
    pdfUrl && pdfUrl !== "#"
      ? pdfUrl.startsWith("http")
        ? pdfUrl
        : `${window.location.origin}${pdfUrl}`
      : "#";

  const handlePdfClick = (event) => {
    event.stopPropagation();

    if (!resolvedPdfUrl || resolvedPdfUrl === "#") {
      event.preventDefault();
      return;
    }

    window.open(resolvedPdfUrl, "_blank", "noopener,noreferrer");
    event.preventDefault();
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <div className={styles.lessonNum}>{String(id).padStart(2, "0")}</div>
      </div>

      <div className={styles.cardBody}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.codePreview}>
        <span className={styles.previewCode}>{previewCode}</span>
        <span className={styles.previewLine1}>{previewLine1}</span>
        <span className={styles.previewLine2}>{previewLine2}</span>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.topicCount}>{topics} topics</span>
        <a
          href={resolvedPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pdfBtn}
          onClick={handlePdfClick}
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default ModuleCard;
