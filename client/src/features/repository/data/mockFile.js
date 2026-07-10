// models/file.js
export const files = [
  {
    id: "file_1",
    repoId: "repo_1",
    name: "index.js",
    content: `console.log("Hello GitHero 🚀");`,
    updatedAt: new Date(),
  },
  {
    id: "file_2",
    repoId: "repo_1",
    name: "app.js",
    content: `export const app = () => {};`,
    updatedAt: new Date(),
  },
];