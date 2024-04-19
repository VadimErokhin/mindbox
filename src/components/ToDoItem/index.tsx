import style from "./style.module.css";

interface ToDoItemProps {
  name: string;
  isChecked: boolean;
  toggleCheckedToDo: (id: string) => void;
  id: string;
}

function ToDoItem(props: ToDoItemProps) {
  return (
    <label className={style.todoItem}>
      <input
        className={style.input}
        type="checkbox"
        checked={props.isChecked}
        onChange={() => props.toggleCheckedToDo(props.id)}
      />
      <span
        className={
          props.isChecked
            ? `${style.name} ${style.crossedOut}`
            : `${style.name}`
        }
      >
        {props.name}
      </span>
    </label>
  );
}

export default ToDoItem;
