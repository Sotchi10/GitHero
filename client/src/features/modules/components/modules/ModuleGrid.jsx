import ModuleCard from "./ModuleCard";
import styles from "./ModuleGrid.module.css";

function ModulesGrid({ modules, selectedId, onSelect }) {
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
          key={module.id}
          module={module}
          isSelected={module.id === selectedId}
          onClick={() => onSelect(module)}
        />
      ))}
    </div>
  );
}

export default ModulesGrid;
