function CommandCard({ data }) {
  const Icon = data.Icon;

  return (
    <article className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-[#222] dark:bg-[#111] dark:hover:border-white/20 dark:hover:bg-[#151515]">
      <div className="mb-2 flex items-center gap-2 border-b border-gray-200 pb-3 transition-colors duration-200 dark:border-[#242424] dark:group-hover:border-white/20">
        <Icon className="text-gray-500 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-white" />

        <h3 className="text-sm font-medium text-blue-600 dark:text-blue-500">
          {data.title}
        </h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-[#1e2630]">
        {data.items.map((item) => (
          <div
            key={item.cmd}
            className="flex items-start gap-3 rounded-md px-2 py-3 transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <div className="min-w-0">
              <code className="inline-block max-w-full rounded-md border border-gray-300 bg-gray-100 px-2 py-1 font-mono text-xs text-gray-900 transition-colors duration-150 dark:border-[#242424] dark:bg-[#111111] dark:text-gray-100 dark:group-hover:border-white/15">
                {item.cmd}
              </code>

              <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-[#9ba7b6]">
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