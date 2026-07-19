import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModulesGrid from "../components/modules/ModuleGrid";
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
              className={styles.searchInput}
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
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default ModulesPage;
