function CommandCard({ data }) {
  const Icon = data.Icon;

  return (
    <article className="group rounded-lg border border-[#222] bg-[#111] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-[#151515] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      
      <div className="mb-2 flex items-center gap-2 border-b border-default pb-3 transition-colors duration-200 group-hover:border-white/20">
        <Icon className="text-border-default transition-colors duration-200 group-hover:text-white" />
        <h3 className="text-sm font-medium text-blue-500">{data.title}</h3>
      </div>

      <div className="divide-y divide-[#1e2630]">
        {data.items.map((item) => (
          <div
            key={item.cmd}
            className="flex items-start gap-3 rounded-md px-2 py-3 transition-colors duration-150 hover:bg-white/5"
          >
            <div className="min-w-0">
              <code className="inline-block max-w-full rounded-md border border-[#242424] bg-[#111111] px-2 py-1 font-mono text-xs transition-colors duration-150 group-hover:border-white/15">
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
