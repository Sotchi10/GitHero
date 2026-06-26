const buttonColors = {
  primary: "bg-btn-primary hover:bg-btn-primary-hover text-white border border-transparent",
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
