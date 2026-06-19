import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiGitBranch,
  FiSearch,
  FiUser,
  FiUsers,
} from "react-icons/fi";

const REFERENCE_DATA = {
  solo: {
    do: {
      title: "Working alone: do this",
      Icon: FiUser,
      color: "green",
      items: [
        {
          cmd: 'git commit -m "feat: add profile page"',
          desc: "Write clear, descriptive commit messages every time.",
        },
        {
          cmd: "git branch feature/name",
          desc: "Always branch off main before starting new work.",
        },
        {
          cmd: "git stash",
          desc: "Stash unfinished work before switching context.",
        },
        {
          cmd: "git log --oneline",
          desc: "Review history regularly to stay oriented.",
        },
      ],
    },
    avoid: {
      title: "Working alone: avoid this",
      Icon: FiAlertTriangle,
      color: "red",
      items: [
        {
          cmd: 'git commit -m "fix"',
          desc: "Vague messages make history hard to understand later.",
        },
        {
          cmd: "git push --force",
          desc: "Force push rewrites history and can remove useful work.",
        },
        {
          cmd: "git add .",
          desc: "Staging everything blindly can include unintended files.",
        },
        {
          cmd: "git reset --hard",
          desc: "Hard reset permanently discards uncommitted work.",
        },
      ],
    },
  },
  collab: {
    do: {
      title: "Collaborating: do this",
      Icon: FiUsers,
      color: "green",
      items: [
        {
          cmd: "git pull --rebase",
          desc: "Rebase keeps your local work on top of the latest changes.",
        },
        {
          cmd: "git fetch origin",
          desc: "Fetch before starting work to see team changes.",
        },
        {
          cmd: "git merge --no-ff",
          desc: "Preserve a merge commit for traceability in pull requests.",
        },
        {
          cmd: "git diff main",
          desc: "Review your diff against main before opening a pull request.",
        },
      ],
    },
    avoid: {
      title: "Collaborating: avoid this",
      Icon: FiAlertTriangle,
      color: "red",
      items: [
        {
          cmd: "git push -f origin main",
          desc: "Force pushing shared branches can overwrite team work.",
        },
        {
          cmd: "git commit --amend",
          desc: "Amending pushed commits can break another person's history.",
        },
        {
          cmd: "git rebase main",
          desc: "Rebasing public branches can create conflicts for the team.",
        },
        {
          cmd: "git push origin main",
          desc: "Pushing directly to main bypasses pull request review.",
        },
      ],
    },
  },
};

const COMMANDS = [
  {
    cmd: "git status",
    desc: "Show changed, staged, and untracked files.",
  },
  {
    cmd: "git add <file>",
    desc: "Stage a file for the next commit.",
  },
  {
    cmd: "git commit -m <message>",
    desc: "Save staged work with a message.",
  },
  {
    cmd: "git checkout -b <branch>",
    desc: "Create and switch to a new branch.",
  },
  {
    cmd: "git pull --rebase",
    desc: "Update your branch and replay local commits on top.",
  },
  {
    cmd: "git diff --staged",
    desc: "Preview staged changes before committing.",
  },
];

const tabs = [
  { id: "todo", label: "To-do" },
  { id: "commands", label: "Commands" },
];

const ALL_REFERENCE_CARDS = [
  REFERENCE_DATA.solo.do,
  REFERENCE_DATA.solo.avoid,
  REFERENCE_DATA.collab.do,
  REFERENCE_DATA.collab.avoid,
];

function CommandCard({ data }) {
  const isGreen = data.color === "green";
  const Icon = data.Icon;

  return (
    <article
      className={`rounded-lg border bg-[#111] p-4 ${
        isGreen ? "border-[#1d4030]" : "border-[#3a1e1e]"
      }`}
    >
      <div className="mb-2 flex items-center gap-2 border-b border-[#1e1e1e] pb-3">
        <Icon className={isGreen ? "text-[#4caf8a]" : "text-[#e06060]"} />
        <h3 className="text-sm font-medium text-[#d3d3d3]">{data.title}</h3>
      </div>

      <div className="divide-y divide-[#1a1a1a]">
        {data.items.map((item) => (
          <div key={item.cmd} className="flex items-start gap-3 py-3">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                isGreen ? "bg-[#4caf8a]" : "bg-[#e06060]"
              }`}
            />
            <div className="min-w-0">
              <code
                className={`inline-block max-w-full rounded px-2 py-1 font-mono text-xs ${
                  isGreen
                    ? "bg-[#0e2018] text-[#7dd3b0]"
                    : "bg-[#200e0e] text-[#e89090]"
                }`}
              >
                {item.cmd}
              </code>
              <p className="mt-1 text-xs leading-relaxed text-[#777]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function CommandList({ commands }) {
  if (commands.length === 0) {
    return (
      <div className="rounded-lg border border-[#202020] bg-[#111] p-10 text-center text-sm text-[#666]">
        No commands match your search.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {commands.map((item) => (
        <div
          key={item.cmd}
          className="rounded-lg border border-[#202020] bg-[#111] p-4"
        >
          <code className="rounded bg-[#0e2018] px-2 py-1 font-mono text-xs text-[#7dd3b0]">
            {item.cmd}
          </code>
          <p className="mt-2 text-sm leading-relaxed text-[#8a8a8a]">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

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
            {tabs.map((tab) => (
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
