const DashNavItem = ({ img, icon: Icon, itemName, active = false, className = "" }) => {
  return (
    <div
<<<<<<< HEAD
      className={`flex items-center gap-2 px-2 py-1.5 rounded-[5px] border border-transparent hover:border-gray-900 dark:hover:border-white/40 transition-colors ${className}`}
=======
      className={`flex items-center gap-2 border-l-2 px-2 py-1.5 transition-colors hover:bg-surface-raised ${
        active
          ? "border-blue-500 bg-surface-raised font-semibold text-primary"
          : "border-transparent text-muted hover:text-primary"
      } ${className}`}
>>>>>>> c80c81371d78870aa2dacc63d8c8570ff549f0de
    >
      <div className="w-4.25 h-4.25 flex items-center justify-center">
        {Icon ? (
          <Icon className={`h-full w-full ${active ? "text-blue-500" : "text-muted"}`} />
        ) : img ? (
          <img
            src={img}
            alt={itemName}
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-400 rounded-[5px]" />
        )}
      </div>

      <p className="text-[13.5px] text-gray-900 dark:text-white">{itemName}</p>
    </div>
  );
};
export default DashNavItem;