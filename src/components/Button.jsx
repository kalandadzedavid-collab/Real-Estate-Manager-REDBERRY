const Button = ({ children, color, submit }) => {
  return (
    <button type={submit}
      className={`${
        color === "orange" ? orangeBut : color === "white" ? whiteBut : grayBut
      }  cursor-pointer px-4 py-2.5 transition-all rounded-[10px] 
text-base
font-medium border `}
    >
      {children}
    </button>
  );
};

export default Button;

const orangeBut = "bg-orange-600 text-white border-orange-600 hover:bg-red-600";
const whiteBut =
  "bg-white text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white";
const grayBut =
  "bg-white text-zinc-500 border-zinc-500 hover:bg-zinc-500 hover:text-white";
