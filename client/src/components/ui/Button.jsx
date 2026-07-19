const buttonColors = {
  primary:
  "bg-white text-gray-600 border border-gray-600 hover:bg-blue-50 dark:bg-blue-600 dark:text-white dark:border-transparent dark:hover:bg-blue-700",
  outline: "bg-transparent text-white border border-white hover:border-default",
  nonoutline: "bg-transparent text-white"
};

const Button = ({ text, type = "button", bcolor = "nonoutline", className = "", children, onClick }) => {
  const selectedColor = buttonColors[bcolor];

  return (
    <button
    onClick={onClick}
      type={type}
      className={`rounded-lg px-6 py-2 font-semibold text-[15px] cursor-pointer transition-colors ${selectedColor} ${className}`}
    >
      {children || text}
    </button>
  );
};

export default Button;
