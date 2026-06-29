function CommandCard({ data }) {
  const Icon = data.Icon;

  return (
    <article className="group rounded-xl border border-[#243041] bg-linear-to-br from-[#121821] to-[#0f151b] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-1 hover:border-[#4f7fbf] hover:shadow-[0_12px_30px_rgba(41,90,170,0.2)]">
      <div className="mb-3 flex items-center gap-2 border-b border-[#243041] pb-3">
        <div className="rounded-lg bg-[#1b2a3f] p-2">
          <Icon className="text-[#6ea8ff]" />
        </div>
        <h3 className="text-sm font-semibold text-[#f2f6ff]">{data.title}</h3>
      </div>

      <div className="divide-y divide-[#1e2630]">
        {data.items.map((item) => (
          <div
            key={item.cmd}
            className="flex items-start gap-3 rounded-md px-2 py-3 transition-colors duration-150 hover:bg-[#151d28]"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6ea8ff]" />

            <div className="min-w-0">
              <code className="inline-block max-w-full rounded-md border border-[#2b3949] bg-[#111821] px-2 py-1 font-mono text-xs text-[#4ee6b8]">
                {item.cmd}
              </code>

              <p className="mt-1 text-xs leading-relaxed text-[#9ba7b6]">
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
