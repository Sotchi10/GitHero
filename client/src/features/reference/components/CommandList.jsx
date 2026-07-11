function CommandList({ commands }) {
  if (!commands || Object.keys(commands).length === 0) {
    return (
      <div className="rounded-xl border border-[#243041] bg-[#10161d] p-10 text-center text-sm text-[#9ba7b6]">
        No commands found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(commands).map(([key, group]) => (
        <div
          key={key}
          className="rounded-2xl p-4"
        >
          <h2 className="mb-4 text-lg font-semibold text-[#f2f6ff]">
            {group.title}
          </h2>

          <div className="grid gap-3">
            {group.items.map((item) => (
              <div
                key={item.cmd}
                className="rounded-lg border border-[#242424] bg-[#111111] p-4 transition duration-150 hover:-translate-y-0.5 hover:border-white"
              >
                <code className="rounded-md border border-[#242424] bg-[#111111] px-2 py-1 font-mono text-xs text-[#8ee4b2]">
                  {item.cmd}
                </code>
                <p className="mt-2 text-sm leading-relaxed text-[#9ba7b6]">
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
