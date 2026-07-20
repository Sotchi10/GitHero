import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModulesGrid from "../components/modules/ModuleGrid";
import { NotePanel } from "../components/note";
import modulesData from "../data/modulesData";
import { getModules } from "../../../api/apiModule";
import styles from "./ModulesPage.module.css";

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
    <div className={`${styles.page} px-4`}>
      <div className={styles.topbar}>
        <div className={styles.topbarRight}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>⌕</span>
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
      <div className={styles.body}>
        <main className={styles.content}>
          <header className={styles.pageHeader}>
            <h1 className={styles.heading}>Modules</h1>
            <p className={styles.subheading}>
              Learn Git and GitHub from scratch
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