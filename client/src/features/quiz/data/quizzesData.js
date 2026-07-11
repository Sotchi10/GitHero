const quizzesData = [
  {
    id: 1,
    num: "01",
    title: "Git Basics",
    desc: "Core concepts: init, add, commit and the working directory.",
    questions: [
      {
        type: "mc",
        text: "What command initializes a new Git repository?",
        options: ["git start", "git init", "git create", "git new"],
        answer: 1,
      },
      {
        type: "tf",
        text: "True or False: git commit saves your changes directly to GitHub.",
        answer: false,
      },
      {
        type: "mc",
        text: "Which command stages all changed files?",
        options: ["git push .", "git commit -a", "git add .", "git stage all"],
        answer: 2,
      },
    ],
  },
  {
    id: 2,
    num: "02",
    title: "Branching",
    desc: "Creating, switching and merging branches in a repository.",
    questions: [
      {
        type: "mc",
        text: "Which command creates and switches to a new branch?",
        options: [
          "git branch new",
          "git checkout -b feature",
          "git switch --create",
          "git new branch",
        ],
        answer: 1,
      },
      {
        type: "tf",
        text: "True or False: A branch is just a pointer to a commit.",
        answer: true,
      },
      {
        type: "mc",
        text: "How do you merge branch 'feature' into 'main'?",
        options: [
          "git merge feature",
          "git pull feature",
          "git combine feature",
          "git push feature main",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 3,
    num: "03",
    title: "Remote & Push",
    desc: "Working with remotes, pushing and pulling from GitHub.",
    questions: [
      {
        type: "mc",
        text: "What does git push origin main do?",
        options: [
          "Pulls from remote",
          "Creates main branch",
          "Uploads local commits to remote",
          "Merges main into origin",
        ],
        answer: 2,
      },
      {
        type: "tf",
        text: "True or False: git fetch automatically merges remote changes.",
        answer: false,
      },
    ],
  },
  {
    id: 4,
    num: "04",
    title: "Pull Requests",
    desc: "Opening PRs, code review process and merging on GitHub.",
    questions: [
      {
        type: "mc",
        text: "A pull request is used to:",
        options: [
          "Push code directly",
          "Propose merging changes into another branch",
          "Delete a branch",
          "Clone a repository",
        ],
        answer: 1,
      },
      {
        type: "tf",
        text: "True or False: You can comment on specific lines in a PR.",
        answer: true,
      },
      {
        type: "mc",
        text: "Which merge strategy keeps all individual commits?",
        options: [
          "Squash and merge",
          "Rebase and merge",
          "Create a merge commit",
          "Fast-forward only",
        ],
        answer: 2,
      },
    ],
  },
];

export default quizzesData;