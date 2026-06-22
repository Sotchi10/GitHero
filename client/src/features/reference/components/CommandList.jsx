function CommandList({ commands }) {
  if (!commands || Object.keys(commands).length === 0) {
    return (
      <div className="rounded-lg border border-[#202020] bg-[#111] p-10 text-center text-sm text-[#666]">
        No commands found.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {Object.entries(commands).map(([key, group]) => (
        <div key={key}>
          <h2 className="mb-3 text-lg font-semibold text-white">
            {group.title}
          </h2>

          <div className="grid gap-3 xl:grid-cols-1">
            {group.items.map((item) => (
              <div
                key={item.cmd}
                className="rounded-lg border border-[#202020] bg-[#111] p-4"
              >
                <code className="rounded bg-[#202020] px-2 py-1 font-mono text-xs">
                  {item.cmd}
                </code>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8a8a]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommandList;
