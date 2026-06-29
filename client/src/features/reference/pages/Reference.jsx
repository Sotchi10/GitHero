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
      <div className=" flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto px-5">
          <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
            {/* Left Content */}
            <div>
              <div className="flex items-center mb-4">
                <div className="mb-4 inline-flex rounded-[10px] border border-[#243041] bg-[#121821] py-1 px-6 shadow-[0_6px_18px_rgba(0,0,0,0.18)]">
                  {REFERENCE_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-md px-4 py-2 text-sm transition cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-[#1b2a3f] text-[#f2f6ff] shadow-[inset_0_0_0_1px_rgba(110,168,255,0.25)]"
                          : "text-[#8f9aad] hover:bg-[#17212c] hover:text-[#f2f6ff]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="ml-auto w-full sm:w-72">
                  <label htmlFor="command-search" className="sr-only">
                    Search commands
                  </label>

                  <div className="flex items-center gap-2 rounded-md border border-[#243041] bg-[#121821] px-3 py-2 transition focus-within:border-[#4f7fbf] focus-within:shadow-[0_0_0_1px_rgba(110,168,255,0.25)]">
                    <FiSearch className="shrink-0 text-[#6ea8ff]" />

                    <input
                      id="command-search"
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search commands..."
                      className="w-full bg-transparent text-sm text-[#d0d0d0] outline-none placeholder:text-[#6f7b8b]"
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
                      <div className="rounded-xl border border-[#243041] bg-[#10161d] p-10 text-center text-sm text-[#9ba7b6] xl:col-span-2">
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

            <DashSideBarRight />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Reference;
