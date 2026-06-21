import { useMemo, useState } from "react";
import { FiGitBranch, FiSearch } from "react-icons/fi";
import CommandCard from "../components/CommandCard";
import CommandList from "../components/CommandList";
import {
  ALL_REFERENCE_CARDS,
  COMMANDS,
  REFERENCE_TABS,
} from "../data/referenceData";

const Reference = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("todo");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filteredCards = useMemo(() => {
    if (!query) return ALL_REFERENCE_CARDS;

    return ALL_REFERENCE_CARDS
      .map((card) => ({
        ...card,
        items: card.items.filter(
          (item) =>
            item.cmd.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query)
        ),
      }))
      .filter((card) => card.items.length > 0);
  }, [query]);

  const filteredCommands = useMemo(() => {
    if (!query) return COMMANDS;

    return COMMANDS.filter(
      (item) =>
        item.cmd.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
    );
  }, [query]);

  return (
    <section
      className={`flex min-h-full flex-col bg-[#080808] text-[#e0e0e0] ${className}`}
    >
      <header className="flex flex-wrap items-center gap-3 border-b border-[#1e1e1e] bg-[#0d0d0d] px-5 py-4">
        <div className="flex items-center gap-2">
          <FiGitBranch className="text-[#4caf8a]" />
          <h1 className="text-base font-semibold">Quick Reference</h1>
        </div>
        <span className="rounded-full border border-[#2d5c3e] bg-[#1a2e22] px-3 py-1 text-xs text-[#4caf8a]">
          Git Commands
        </span>
        <label className="ml-auto flex w-full items-center gap-2 rounded-md border border-[#2a2a2a] bg-[#181818] px-3 py-2 sm:w-72">
          <FiSearch className="shrink-0 text-[#666]" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search commands..."
            className="w-full bg-transparent text-sm text-[#d0d0d0] outline-none placeholder:text-[#666]"
          />
        </label>
      </header>

      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto p-5">
          <div className="mb-4 inline-flex rounded-lg border border-[#222] bg-[#161616] p-1">
            {REFERENCE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-4 py-2 text-sm transition ${
                  activeTab === tab.id
                    ? "bg-[#242424] text-[#f0f0f0]"
                    : "text-[#777] hover:text-[#ddd]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "todo" && (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredCards.map((card) => (
                <CommandCard key={card.title} data={card} />
              ))}
              {filteredCards.length === 0 && (
                <div className="rounded-lg border border-[#202020] bg-[#111] p-10 text-center text-sm text-[#666] xl:col-span-2">
                  No commands match "{search}".
                </div>
              )}
            </div>
          )}

          {activeTab === "commands" && (
            <CommandList commands={filteredCommands} />
          )}
        </main>
      </div>
    </section>
  );
};

export default Reference;
