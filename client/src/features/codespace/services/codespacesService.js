const success = (output) => ({ status: "success", output, exitCode: 0 });
const error = (output) => ({ status: "error", output, exitCode: 1 });

export const validateGitCommand = (input) => {
  const command = input.trim();

  if (!command) return error("Enter a Git command.");
  if (!/^git(?:\s|$)/i.test(command)) {
    return error("Only Git commands are supported.");
  }

  const normalized = command.replace(/\s+/g, " ");
  if (/^git init$/i.test(normalized)) {
    return success("Initialized empty Git repository successfully.");
  }
  if (/^git status$/i.test(normalized)) {
    return success("On branch main. Nothing to commit, working tree clean.");
  }
  if (/^git add \.$/i.test(normalized)) {
    return success("Files added to staging area.");
  }

  const commit = normalized.match(/^git commit -m (["'])(.*?)\1$/i);
  if (commit) return success(`[main abc1234] ${commit[2]}`);

  return error("Unsupported Git command.");
};

export const executeMockGitCommand = (input) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(validateGitCommand(input)), 500);
  });
