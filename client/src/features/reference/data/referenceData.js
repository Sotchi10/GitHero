import { FiAlertTriangle, FiUser, FiUsers } from "react-icons/fi";

export const REFERENCE_DATA = {
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

export const COMMANDS = [
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

export const REFERENCE_TABS = [
  { id: "todo", label: "To-do" },
  { id: "commands", label: "Commands" },
];

export const ALL_REFERENCE_CARDS = [
  REFERENCE_DATA.solo.do,
  REFERENCE_DATA.solo.avoid,
  REFERENCE_DATA.collab.do,
  REFERENCE_DATA.collab.avoid,
];
