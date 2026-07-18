import { useState, useMemo } from "react";
import FilterBar from "../components/modules/FilterBar";
import ModulesGrid from "../components/modules/ModuleGrid";
import { NotePanel } from "../components/note";
import modulesData from "../data/modulesData";

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
    <div className="flex min-h-screen flex-1 flex-col px-4 font-sans text-gray-900 dark:text-[#e8eaed]">
      {/* Top Bar */}
      <div className="flex flex-shrink-0 items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-gray-200 px-[15px] py-2 dark:border-[#2a2d30]">
            <span className="text-base leading-none text-gray-500 dark:text-[#555a60]">
              ⌕
            </span>
            <input
              type="text"
              placeholder="Search modules…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 border-none bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400 dark:text-[#c5c8cc] dark:placeholder:text-[#3a3f44]"
            />
          </div>
        </div>
      </div>

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