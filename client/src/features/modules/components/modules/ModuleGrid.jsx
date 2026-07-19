import ModuleCard from "./ModuleCard";
import styles from "./ModuleGrid.module.css";

function ModulesGrid({ modules, onSelect, onContinue }) {
  if (modules.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No modules match this filter.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
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
