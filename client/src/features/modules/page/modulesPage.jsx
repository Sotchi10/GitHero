import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModulesGrid from "../components/modules/ModuleGrid";
<<<<<<< HEAD
import { NotePanel } from "../components/note";
import modulesData from "../data/modulesData";
=======
import { getModules } from "../../../api/apiModule";
import styles from "./ModulesPage.module.css";
>>>>>>> f2a9bcab4362cf3db2b6f77b342368f09167d970

function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadModules = async () => {
      try {
        const res = await getModules();
        setModules(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load modules");
      } finally {
        setLoading(false);
      }
    };
    loadModules();
  }, []);

  const filtered = useMemo(
    () =>
      modules.filter((module) =>
        module.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [modules, search],
  );

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen flex-1 flex-col px-4 font-sans text-gray-900 dark:text-[#e8eaed]">
      {/* Top Bar */}
      <div className="flex flex-shrink-0 items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-gray-200 px-[15px] py-2 dark:border-[#2a2d30]">
            <span className="text-base leading-none text-gray-500 dark:text-[#555a60]">
              ⌕
            </span>
=======
    <div className={`${styles.page} px-4`}>
      <div className={styles.topbar}>
        <div className={styles.topbarRight}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>⌕</span>
>>>>>>> f2a9bcab4362cf3db2b6f77b342368f09167d970
            <input
              type="text"
              placeholder="Search modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 border-none bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400 dark:text-[#c5c8cc] dark:placeholder:text-[#3a3f44]"
            />
          </div>
        </div>
      </div>
<<<<<<< HEAD

      {/* Main Layout */}
      <div className="flex min-h-0 flex-1">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-7">
          {/* Page Header */}
          <header className="mb-5">
            <h1 className="text-[22px] font-medium text-gray-900 dark:text-[#e8eaed]">
              Modules
            </h1>
            <p className="mt-1 text-[13px] text-gray-600 dark:text-[#555a60]">
              {modulesData.length} lessons · Learn Git and GitHub from scratch
=======
      <div className={styles.body}>
        <main className={styles.content}>
          <header className={styles.pageHeader}>
            <h1 className={styles.heading}>Modules</h1>
            <p className={styles.subheading}>
              Learn Git and GitHub from scratch
>>>>>>> f2a9bcab4362cf3db2b6f77b342368f09167d970
            </p>
          </header>
          {loading && <p className="text-gray-400">Loading modules...</p>}
          {error && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}
          {!loading && !error && (
            <ModulesGrid
              modules={filtered}
              onSelect={(module) => navigate(`/modules/${module.module_id}`)}
              onContinue={(module) =>
                navigate(`/modules/${module.module_id}?lesson=${module.next_lesson_id}`)
              }
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default ModulesPage;