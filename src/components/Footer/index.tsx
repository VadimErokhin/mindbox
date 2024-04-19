import Button from "../Button";
import style from "./style.module.css";

interface FooterProps {
  left: number;
  filterTodos: (completed?: boolean) => void;
  clearCompletedTodo: () => void;
  currentFilter: string;
}

function Footer(props: FooterProps) {
  function handlerAllTodos() {
    props.filterTodos();
  }
  function handlerActiveTodos() {
    props.filterTodos(false);
  }
  function handlerCompletedTodos() {
    props.filterTodos(true);
  }

  return (
    <footer className={style.footer}>
      <span className={style.left}>{props.left} items left</span>
      <div className={style.filterBtnsWrapper}>
        <Button
          className={props.currentFilter === "all" ? style.border : ""}
          onClick={handlerAllTodos}
        >
          All
        </Button>
        <Button
          className={props.currentFilter === "active" ? style.border : ""}
          onClick={handlerActiveTodos}
        >
          Active
        </Button>
        <Button
          className={props.currentFilter === "completed" ? style.border : ""}
          onClick={handlerCompletedTodos}
        >
          Completed
        </Button>
      </div>
      <Button onClick={props.clearCompletedTodo}>Clear Completed</Button>
    </footer>
  );
}

export default Footer;
