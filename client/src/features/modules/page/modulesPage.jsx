import { useState, useMemo } from "react";
import FilterBar from "../components/modules/FilterBar";
import ModulesGrid from "../components/modules/ModuleGrid";
import NotePanel from "../components/modules/NotePanel";
import modulesData from "../data/modulesData";
import styles from "./ModulesPage.module.css";

function getStatusKey(progress) {
  if (progress === 100) return "completed";
  if (progress > 0) return "in-progress";
  return "not-started";
}

function ModulesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);

  const filtered = useMemo(() => {
    const list = Array.isArray(modulesData) ? modulesData : [];

    return list.filter((m) => {
      const matchesFilter =
        activeFilter === "all" ||
        getStatusKey(m?.progress ?? 0) === activeFilter;
      const title = (m?.title ?? "").toLowerCase();
      const matchesSearch =
        search.trim() === "" || title.includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className={`${styles.page} px-4`}>
      {/* Top Bar */}
      <div className={styles.topbar}>
        <div className={styles.topbarRight}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>⌕</span>
            <input
              type="text"
              placeholder="Search modules…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className={styles.body}>
        {/* Content */}
        <main className={styles.content}>
          {/* Page Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.heading}>Modules</h1>
            <p className={styles.subheading}>
              {modulesData.length} lessons · learn Git and GitHub from scratch
            </p>
          </header>

          {/* Filters */}
          <FilterBar active={activeFilter} onChange={setActiveFilter} />

          {/* Modules */}
          <ModulesGrid
            modules={filtered}
            selectedId={selectedLesson?.id}
            onSelect={setSelectedLesson}
          />
        </main>

        {/* Right Sidebar */}
        <aside>
          <NotePanel selectedLesson={selectedLesson} />
        </aside>
      </div>
    </div>
  );
}

export default ModulesPage;
