const DashNavItem = ({ img, icon: Icon, itemName, active = false, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2 border-l-2 px-2 py-1.5 transition-colors hover:bg-surface-raised ${
        active
          ? "border-blue-500 bg-surface-raised font-semibold text-primary"
          : "border-transparent text-muted hover:text-primary"
      } ${className}`}
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

      <p className="text-[13.5px]">{itemName}</p>
    </div>
  );
};
export default DashNavItem;
