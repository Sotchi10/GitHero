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
  {
    id: 5,
    num: "05",
    title: "Git Status",
    desc: "Learn how to check the current state of your repository.",
    questions: [
      {
        type: "mc",
        text: "Which command shows the current status of your repository?",
        options: ["git status", "git info", "git check", "git show"],
        answer: 0,
      },
      {
        type: "tf",
        text: "True or False: git status shows which files have changed.",
        answer: true,
      },
      {
        type: "mc",
        text: "What color are untracked files usually shown in Git?",
        options: ["Green", "Red", "Blue", "Yellow"],
        answer: 1,
      },
    ],
  },
  {
    id: 6,
    num: "06",
    title: "Git Clone",
    desc: "Copy an existing repository from GitHub.",
    questions: [
      {
        type: "mc",
        text: "Which command copies a repository from GitHub?",
        options: ["git copy", "git clone", "git pull", "git fetch"],
        answer: 1,
      },
      {
        type: "tf",
        text: "True or False: git clone downloads the entire repository.",
        answer: true,
      },
      {
        type: "mc",
        text: "After cloning, what folder is created?",
        options: [
          "A folder with the repository name",
          "A random folder",
          "No folder",
          "A GitHub folder",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 7,
    num: "07",
    title: "Git Add",
    desc: "Stage files before committing them.",
    questions: [
      {
        type: "mc",
        text: "Which command stages a file named app.js?",
        options: [
          "git stage app.js",
          "git add app.js",
          "git commit app.js",
          "git save app.js",
        ],
        answer: 1,
      },
      {
        type: "tf",
        text: "True or False: Files must be staged before they can be committed.",
        answer: true,
      },
      {
        type: "mc",
        text: "Which command stages every changed file?",
        options: ["git add .", "git stage .", "git commit .", "git all"],
        answer: 0,
      },
    ],
  },
  {
    id: 8,
    num: "08",
    title: "Git Commit",
    desc: "Save your staged changes with a message.",
    questions: [
      {
        type: "mc",
        text: "Which command creates a commit?",
        options: [
          "git commit -m 'message'",
          "git save",
          "git upload",
          "git push",
        ],
        answer: 0,
      },
      {
        type: "tf",
        text: "True or False: Every commit should have a meaningful message.",
        answer: true,
      },
      {
        type: "mc",
        text: "What is the purpose of a commit message?",
        options: [
          "Describe the changes",
          "Delete files",
          "Rename branches",
          "Connect to GitHub",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 9,
    num: "09",
    title: "Git Pull",
    desc: "Download the latest changes from GitHub.",
    questions: [
      {
        type: "mc",
        text: "Which command downloads and merges remote changes?",
        options: ["git fetch", "git clone", "git pull", "git push"],
        answer: 2,
      },
      {
        type: "tf",
        text: "True or False: git pull updates your local branch.",
        answer: true,
      },
      {
        type: "mc",
        text: "When should you usually run git pull?",
        options: [
          "Before starting new work",
          "After deleting a branch",
          "Before installing Git",
          "Never",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 10,
    num: "10",
    title: "GitHub Basics",
    desc: "Basic knowledge about GitHub and repositories.",
    questions: [
      {
        type: "mc",
        text: "GitHub is mainly used to:",
        options: [
          "Host Git repositories online",
          "Write Word documents",
          "Edit photos",
          "Create databases",
        ],
        answer: 0,
      },
      {
        type: "tf",
        text: "True or False: Git and GitHub are the same thing.",
        answer: false,
      },
      {
        type: "mc",
        text: "Which website is commonly used to host Git repositories?",
        options: ["GitHub", "Google Drive", "Dropbox", "YouTube"],
        answer: 0,
      },
    ],
  },
];

export default quizzesData;