function CommandCard({ data }) {
  const Icon = data.Icon;

  return (
    <article className="rounded-lg border border-[#222] bg-[#111] p-4">
      <div className="mb-2 flex items-center gap-2 border-b border-default pb-3">
        <Icon className="text-border-default" />
        <h3 className="text-sm font-medium text-[#d3d3d3]">{data.title}</h3>
      </div>

      <div className="divide-y divide-[#1a1a1a]">
        {data.items.map((item) => (
          <div key={item.cmd} className="flex items-start gap-3 py-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border-default" />
          
            <div className="min-w-0">
              <code className="inline-block max-w-full rounded bg-[#181818] px-2 py-1 font-mono text-xs text-border-default">
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
