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

export default CommandList;
