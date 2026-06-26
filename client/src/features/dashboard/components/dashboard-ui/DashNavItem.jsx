const DashNavItem = ({ img, icon: Icon, itemName, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1.5 hover:bg-[#161616] hover:rounded-[5px] ${className}`}
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

      <p className="text-[13.5px]">{itemName}</p>
    </div>
  );
};
export default DashNavItem;
