import { useEffect, useRef, useState } from "react";
import { executeMockGitCommand } from "../services/codespacesService";

const Codespaces = ({ className = "" }) => {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [copyLabel, setCopyLabel] = useState("Copy Output");
  const commandRef = useRef(null);
  const runningRef = useRef(false);

  const runCommand = async () => {
    if (runningRef.current) return;

    const submittedCommand = command.trim();
    runningRef.current = true;
    setRunning(true);
    setCopyLabel("Copy Output");
    setResult(null);
    try {
      const response = await executeMockGitCommand(submittedCommand);
      setResult(response);
      if (submittedCommand) {
        setHistory((current) => [submittedCommand, ...current].slice(0, 8));
      }
    } finally {
      runningRef.current = false;
      setRunning(false);
    }
  };

  const clearWorkspace = () => {
    if (running) return;
    setCommand("");
    setResult(null);
    setCopyLabel("Copy Output");
    commandRef.current?.focus();
  };

  const copyOutput = async () => {
    if (!result?.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopyLabel("Copied!");
    } catch {
      setCopyLabel("Copy unavailable");
    }
  };

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        runCommand();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  });

  return (
    <section className={`mx-auto w-full max-w-5xl px-1 py-3 text-[#e0e0e0] sm:px-3 ${className}`}>
      <header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Codespaces</h1>
        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Practice Git commands and view their output.
        </p>
      </header>

      <div className="mt-7 rounded-xl border border-[#242424] bg-[#111111] p-4 sm:p-6">
        <label htmlFor="git-command" className="text-sm font-medium">
          Git command
        </label>
        <textarea
          ref={commandRef}
          id="git-command"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          placeholder={'Try: git commit -m "message"'}
          disabled={running}
          rows={7}
          className="mt-3 w-full resize-y rounded-lg border border-[#303030] bg-[#090909] p-4 font-mono text-sm text-gray-100 outline-none placeholder:text-gray-600 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          aria-describedby="command-help"
        />
        <p id="command-help" className="mt-2 text-xs text-gray-500">
          Press Ctrl/Cmd + Enter to run. Commands are simulated and never run on a server.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={runCommand}
            disabled={running}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {running ? "Running..." : "Run Command"}
          </button>
          <button
            type="button"
            onClick={clearWorkspace}
            disabled={running}
            className="rounded-lg border border-[#363636] px-4 py-2 text-sm font-medium hover:bg-[#1b1b1b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={copyOutput}
            disabled={!result?.output || running}
            className="rounded-lg border border-[#363636] px-4 py-2 text-sm font-medium hover:bg-[#1b1b1b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copyLabel}
          </button>
        </div>
      </div>

      <section className="mt-5 rounded-xl border border-[#242424] bg-[#111111] p-4 sm:p-6" aria-live="polite">
        <h2 className="text-base font-semibold">Output</h2>
        {running ? (
          <p className="mt-4 text-sm text-blue-400">Running command...</p>
        ) : result ? (
          <div className="mt-4">
            <p className={`text-sm font-medium ${result.status === "success" ? "text-green-400" : "text-red-400"}`}>
              {result.status === "success" ? "Command completed successfully" : "Command failed"}
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-[#090909] p-4 whitespace-pre-wrap font-mono text-sm text-gray-200">
              {result.output}
            </pre>
            <p className="mt-3 text-xs text-gray-400">Exit code: {result.exitCode}</p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">Run a Git command to see its output.</p>
        )}
      </section>

      {history.length > 0 && (
        <section className="mt-5 rounded-xl border border-[#242424] bg-[#111111] p-4 sm:p-6">
          <h2 className="text-base font-semibold">Session history</h2>
          <ul className="mt-3 space-y-2 font-mono text-sm text-gray-400">
            {history.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
          </ul>
        </section>
      )}
    </section>
  );
};
export default Codespaces;
