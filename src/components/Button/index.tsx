import style from "./style.module.css";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${style.btn} ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
