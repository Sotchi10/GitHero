function CommandCard({ data }) {
  const Icon = data.Icon;

  return (
    <article className="rounded-lg border border-[#222] bg-[#111] p-4">
      <div className="mb-2 flex items-center gap-2 border-b border-default pb-3">
        <Icon className="text-border-default" />
        <h3 className="text-sm font-medium text-[#d3d3d3]">{data.title}</h3>
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
