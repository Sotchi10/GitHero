const buttonColors = {
  primary: "bg-btn-primary hover:bg-btn-primary-hover text-white border-transparent",
  outline: "bg-transparent text-white border-white hover:border-default",
};

const Button = ({ text, type = "button", bcolor = "primary", className = "", children }) => {
  const selectedColor = buttonColors[bcolor];

  return (
    <button
      type={type}
      className={`rounded-lg border px-6 py-2 font-semibold text-[15px] cursor-pointer transition-colors ${selectedColor} ${className}`}
    >
      {children || text}
    </button>
  );
};

export default Button;
