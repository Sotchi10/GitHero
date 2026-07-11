import { useMemo, useState, useEffect } from "react";
import { FaPlus, FaRegEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { getModules, getModuleById } from "../api/apiModule";
import modulesData from "../features/modules/data/modulesData";


const AdminModules = () => {
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const [modules, setModules] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const filteredModules = useMemo(
    () =>
      modulesData.filter((module) =>
        module.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-normal text-gray-400">
            Content library
          </p>
          <h1 className="mt-2 text-3xl font-bold">Modules</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-btn-primary px-5 py-2 text-sm font-semibold hover:bg-btn-primary-hover">
          <FaPlus />
          Add module
        </button>
      </header>

      <div className="flex max-w-md items-center gap-3 rounded-lg border border-default bg-surface px-4 py-2">
        <FaSearch className="text-sm text-gray-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search modules"
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
        />
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {filteredModules.map((module) => (
          <article
            key={module.title}
            className="rounded-lg border border-default bg-surface p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{module.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {module.lessons} lessons - Updated {module.updated}
                </p>
              </div>
              <span className="rounded-lg border border-[#242424] px-3 py-1 text-xs text-gray-300">
                {module.status}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button className="rounded-lg border border-default px-3 py-2 text-sm hover:bg-[#161616]">
                Manage lessons
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-default px-3 py-2 text-sm hover:bg-[#161616]">
                <FaRegEdit />
                Edit
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-red-900/70 px-3 py-2 text-sm text-red-300 hover:bg-red-950/30">
                <FaTrashAlt />
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AdminModules;
