const DashNavItem = ({ img, icon: Icon, itemName, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1.5 rounded-[5px] border border-transparent hover:border-gray-900 dark:hover:border-white/40 transition-colors ${className}`}
    >
      <div className="w-4.25 h-4.25 flex items-center justify-center">
        {Icon ? (
          <Icon className="w-full h-full text-[#8a8a8a]" />
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