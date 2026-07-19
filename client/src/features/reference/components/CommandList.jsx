function CommandList({ commands }) {
  if (!commands || Object.keys(commands).length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 shadow-sm dark:border-[#243041] dark:bg-[#10161d] dark:text-[#9ba7b6]">
        No commands found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(commands).map(([key, group]) => (
        <div
          key={key}
          className="rounded-2xl bg-white p-4 shadow-sm dark:bg-transparent"
        >
          <h2 className="mb-4 text-size-lg font-semibold text-gray-900 dark:text-[#f2f6ff]">
            {group.title}
          </h2>

          <div className="grid gap-3">
            {group.items.map((item) => (
              <div
                key={item.cmd}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-blue-300 dark:border-[#242424] dark:bg-[#111111] dark:hover:border-white"
              >
                <code className="rounded-md border border-gray-300 bg-gray-100 px-2 py-1 font-mono text-xs text-blue-600 dark:border-[#242424] dark:bg-[#111111] dark:text-blue-500">
                  {item.cmd}
                </code>

                <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-[#9ba7b6]">
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