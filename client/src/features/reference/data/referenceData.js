import { FiAlertTriangle, FiUser, FiUsers } from "react-icons/fi";

export const REFERENCE_DATA = {
  solo: {
    do: {
      title: "Working Alone: Do This",
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
      title: "Working Alone: Avoid This",
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
      title: "Collaborating: Do This",
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
      title: "Collaborating: Avoid This",
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

export const COMMANDS = {
  beginner: {
    title: "Beginner Git Basics",
    items: [
      {
        cmd: "git init",
        desc: "Initialize a new Git repository in your project.",
      },
      {
        cmd: "git clone <repo-url>",
        desc: "Copy an existing repository from GitHub or other remote source.",
      },
      {
        cmd: "git status",
        desc: "Show changed, staged, and untracked files.",
      },
      {
        cmd: "git add .",
        desc: "Stage all changes in the current directory.",
      },
      {
        cmd: "git add <file>",
        desc: "Stage a specific file for commit.",
      },
      {
        cmd: "git commit -m <message>",
        desc: "Save staged work with a message.",
      },
    ],
  },

  intermediate: {
    title: "Intermediate Workflow",
    items: [
      {
        cmd: "git log --oneline",
        desc: "View commit history in a compact format.",
      },
      {
        cmd: "git diff",
        desc: "See unstaged changes in your working directory.",
      },
      {
        cmd: "git diff --staged",
        desc: "Preview staged changes before committing.",
      },
      {
        cmd: "git checkout -b <branch>",
        desc: "Create and switch to a new branch.",
      },
      {
        cmd: "git checkout <branch>",
        desc: "Switch to an existing branch.",
      },
      {
        cmd: "git stash",
        desc: "Temporarily save uncommitted changes.",
      },
      {
        cmd: "git stash pop",
        desc: "Restore stashed changes.",
      },
    ],
  },

  collaboration: {
    title: "Collaboration & Remote Work",
    items: [
      {
        cmd: "git push origin <branch>",
        desc: "Upload your commits to a remote repository.",
      },
      {
        cmd: "git pull --rebase",
        desc: "Update your branch and replay your commits on top.",
      },
      {
        cmd: "git fetch origin",
        desc: "Get latest updates from remote without merging.",
      },
      {
        cmd: "git merge --no-ff <branch>",
        desc: "Merge branches while preserving history.",
      },
      {
        cmd: "git branch -d <branch>",
        desc: "Delete a local branch safely after merging.",
      },
      {
        cmd: "git push origin --delete <branch>",
        desc: "Delete a remote branch.",
      },
    ],
  },
};

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
