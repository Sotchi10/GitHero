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
      onClick={onClick}
      className={`flex min-h-[320px] cursor-pointer flex-col overflow-hidden rounded-2xl border transition-[border-color,transform,box-shadow] duration-150 border-gray-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:border-gray-900 dark:border-[#2a2d30] dark:bg-[#0d0d0d] dark:shadow-[0_10px_28px_rgba(0,0,0,0.28)] dark:hover:border-white ${
        isSelected
          ? "-translate-y-0.5 border-blue-600 shadow-[0_0_0_1px_rgba(37,99,235,0.24)] dark:border-white dark:shadow-[0_0_0_1px_rgba(122,179,240,0.24)]"
          : ""
      }`}
    >
<<<<<<< HEAD
      <div className="flex items-start justify-between gap-2.5 px-5 pt-5 pb-3.5">
        <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 font-mono text-[13px] font-medium text-gray-600 dark:border-[#2a2d30] dark:bg-[#1a1d20] dark:text-[#8a8f96]">
          {String(id).padStart(2, "0")}
        </div>
=======
      <div className={styles.cardHeader}>
        <div className={styles.lessonNum}>{String(module_id).padStart(2, "0")}</div>
>>>>>>> f2a9bcab4362cf3db2b6f77b342368f09167d970
      </div>

      <div className="px-5 pb-4">
        <h4 className="mb-1 text-base font-semibold text-gray-900 dark:text-[#e8eaed]">
          {title}
        </h4>
        <p className="text-[13px] leading-[1.7] text-gray-600 dark:text-[#555a60]">
          {description}
        </p>
      </div>

<<<<<<< HEAD
      <div className="mx-5 flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3.5 dark:border-[#2a2d30] dark:bg-[#0d0f10]">
        <span className="font-mono text-[13px] text-gray-900 dark:text-white">
          {previewCode}
        </span>
        <span className="text-[13px] text-gray-500 dark:text-[#919191]">
          {previewLine1}
        </span>
        <span className="text-[13px] text-blue-700 dark:text-[#0058e5]">
          {previewLine2}
        </span>
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-gray-200 px-5 pt-3.5 pb-[18px] dark:border-[#1e2226]">
        <span className="text-[13px] text-gray-600 dark:text-[#555a60]">
          {topics} topics
        </span>
        <a
          href={resolvedPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePdfClick}
          className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3.5 py-1.5 text-xs text-gray-600 no-underline transition-all duration-150 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-[#2a2d30] dark:text-[#8a8f96] dark:hover:border-[#3a4d6b] dark:hover:bg-[#1c2430] dark:hover:text-[#7ab3f0]"
        >
          Download
        </a>
=======
      <div className={styles.codePreview}>
        <span className={styles.previewCode}>{difficulty || "Module"}</span>
        <span className={styles.previewLine1}>{estimated_minutes ? `${estimated_minutes} minutes` : "Self-paced"}</span>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.topicCount}>{total_lessons} lessons</span>
>>>>>>> f2a9bcab4362cf3db2b6f77b342368f09167d970
      </div>
    </div>
  );
}

export default ModuleCard;