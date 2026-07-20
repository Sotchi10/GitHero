import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import CommandCard from "../components/CommandCard";
import CommandList from "../components/CommandList";
import {
  ALL_REFERENCE_CARDS,
  COMMANDS,
  REFERENCE_TABS,
} from "../data/referenceData";
import DashSideBarRight from "./../../../layouts/dashboardlayout/DashSideBarRight";

const Reference = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("todo");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filteredCards = useMemo(() => {
    if (!query) return ALL_REFERENCE_CARDS;

    return ALL_REFERENCE_CARDS.map((card) => ({
      ...card,
      items: card.items.filter(
        (item) =>
          item.cmd.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query),
      ),
    })).filter((card) => card.items.length > 0);
  }, [query]);

  const filteredCommands = Object.fromEntries(
    Object.entries(COMMANDS).map(([key, group]) => [
      key,
      {
        ...group,
        items: group.items.filter(
          (item) =>
            item.cmd.toLowerCase().includes(search.toLowerCase()) ||
            item.desc.toLowerCase().includes(search.toLowerCase()),
        ),
      },
    ]),
  );

  return (
    <section
      className={`flex min-h-full flex-col bg-[radial-gradient(circle_at_top_left,rgba(78,122,255,0.16),transparent_32%),#080808] text-[#e0e0e0] ${className} px-4 py-15`}
    >
      <div className="flex-1 min-w-0">
        <main className="h-full overflow-y-auto px-0 sm:px-5">
          <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
            {/* Left Content */}
            <div>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex w-full gap-1 overflow-x-auto rounded-[10px] border border-[#242424] p-1 sm:w-auto sm:px-2">
                  {REFERENCE_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`shrink-0 rounded-md px-4 py-2 text-sm transition cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-surface-raised text-primary"
                          : "text-muted hover:bg-surface-raised hover:text-primary"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="w-full sm:ml-auto sm:w-72">
                  <label htmlFor="command-search" className="sr-only">
                    Search commands
                  </label>

                  <div className="flex items-center gap-2 rounded-md border border-[#242424]  px-3 py-2 transition focus-within:border-blue-500">
                    <FiSearch className="shrink-0" />

                    <input
                      id="command-search"
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search commands..."
                      className="w-full  bg-transparent text-sm text-[#d0d0d0] outline-none placeholder:text-[#6f7b8b]"
                    />
                  </div>
                </div>
              </div>

              {activeTab === "todo" && (
                <div>
                  <div className="grid gap-4 xl:grid-cols-2">
                    {filteredCards.map((card) => (
                      <CommandCard key={card.title} data={card} />
                    ))}
                    {filteredCards.length === 0 && (
                      <div className="rounded-xl border border-[#242424] p-10 text-center text-sm text-[#9ba7b6] xl:col-span-2">
                        No commands match "{search}".
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "commands" && (
                <CommandList commands={filteredCommands} />
              )}
            </div>

            <DashSideBarRight title="Community" link="Go to developers community ->"/>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Reference;
