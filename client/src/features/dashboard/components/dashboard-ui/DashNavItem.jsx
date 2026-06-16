const DashNavItem = ({ img, icon: Icon, itemName, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2 p-2 hover:bg-[#161616] hover:rounded-[10px] ${className}`}
    >
      <div className="w-4.5 h-4.5 flex items-center justify-center">
        {Icon ? (
          <Icon className="w-full h-full text-gray-400" />
        ) : img ? (
          <img
            src={img}
            alt={itemName}
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-400 rounded-full" />
        )}
      </div>

      <p className="text-[13.5px]">{itemName}</p>
    </div>
  );
};
export default DashNavItem;
