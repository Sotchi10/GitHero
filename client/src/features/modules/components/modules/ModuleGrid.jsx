import ModuleCard from "./ModuleCard";

function ModulesGrid({ modules, onSelect, onContinue }) {
  if (modules.length === 0) {
    return (
      <div className="py-12 text-center text-[13px] text-gray-500 dark:text-[#555a60]">
        <p>No modules match this filter.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
      {modules.map((module) => (
        <ModuleCard
          key={module.module_id}
          module={module}
          onClick={() => onSelect(module)}
          onContinue={onContinue}
        />
      ))}
    </div>
  );
}

export default ModulesGrid;