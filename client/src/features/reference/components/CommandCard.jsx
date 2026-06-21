function CommandCard({ data }) {
  const isGreen = data.color === "green";
  const Icon = data.Icon;

  return (
    <article
      className={`rounded-lg border bg-[#111] p-4 ${
        isGreen ? "border-[#1d4030]" : "border-[#3a1e1e]"
      }`}
    >
      <div className="mb-2 flex items-center gap-2 border-b border-[#1e1e1e] pb-3">
        <Icon className={isGreen ? "text-[#4caf8a]" : "text-[#e06060]"} />
        <h3 className="text-sm font-medium text-[#d3d3d3]">{data.title}</h3>
      </div>

      <div className="divide-y divide-[#1a1a1a]">
        {data.items.map((item) => (
          <div key={item.cmd} className="flex items-start gap-3 py-3">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                isGreen ? "bg-[#4caf8a]" : "bg-[#e06060]"
              }`}
            />
            <div className="min-w-0">
              <code
                className={`inline-block max-w-full rounded px-2 py-1 font-mono text-xs ${
                  isGreen
                    ? "bg-[#0e2018] text-[#7dd3b0]"
                    : "bg-[#200e0e] text-[#e89090]"
                }`}
              >
                {item.cmd}
              </code>
              <p className="mt-1 text-xs leading-relaxed text-[#777]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default CommandCard;
