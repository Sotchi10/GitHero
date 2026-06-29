const modulesData = [
  {
    id: 1,
    title: "What is Git?",
    description:
      "Git is a distributed version control system that allows multiple developers to work on a project simultaneously. ",
    topics: 5,
    progress: 0,
    previewCode: "$ git init",
    previewLine1: "Initialize a new Git repository in the current directory.",
    previewLine2: "in /my-project/.git",
    pdfUrl: "/DBA_Lab7_(SE_G1_T11)3Bugs.pdf",
  },
  {
    id: 2,
    title: "Commits & staging",
    description:
      "Stage changes, write meaningful commit messages, and build a clean project history.",
    topics: 6,
    progress: 60,
    previewCode: "$ git add . && git commit",
    previewLine1: "1 file changed, 3 insertions(+)",
    previewLine2: "main branch · 2 commits",
    pdfUrl: "/DBA_Lab7_(SE_G1_T11)3Bugs.pdf",
  },
  {
    id: 3,
    title: "Branches & merging",
    description:
      "Create isolated branches for features, switch between them, and merge work back to main.",
    topics: 7,
    progress: 0,
    previewCode: "$ git checkout -b feature",
    previewLine1: "Switched to new branch 'feature'",
    previewLine2: "main · feature",
    pdfUrl:
      "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging",
  },
  {
    id: 4,
    title: "GitHub basics",
    description:
      "Push your repo to GitHub, manage remotes, and collaborate using issues and pull requests.",
    topics: 8,
    progress: 0,
    previewCode: "$ git push origin main",
    previewLine1: "Branch 'main' set up to track",
    previewLine2: "remote 'origin/main'",
    pdfUrl: "https://git-scm.com/book/en/v2/Git-on-the-Server-GitHub",
  },
  {
    id: 5,
    title: "Pull requests",
    description:
      "Open a PR, request a code review, respond to feedback, and merge changes safely.",
    topics: 6,
    progress: 0,
    previewCode: 'gh pr create --title "fix"',
    previewLine1: "Opening pull request #12",
    previewLine2: "Reviewers notified · 2 checks",
    pdfUrl: "https://git-scm.com/book/en/v2/GitHub-Pull-Requests",
  },
  {
    id: 6,
    title: "Best practices",
    description:
      ".gitignore, commit conventions, branching strategies, and keeping a clean project history.",
    topics: 5,
    progress: 0,
    previewCode: "# .gitignore",
    previewLine1: "node_modules/",
    previewLine2: ".env · dist/ · *.log",
    pdfUrl:
      "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control",
  },
];

export default modulesData;
