import style from "./style.module.css";
import { useState } from "react";
import ToDoItem from "../ToDoItem";
import Footer from "../Footer";
import { v4 as uuidv4 } from "uuid";
import { useFilter } from "../../hooks/useFilter";

interface DataItem {
  id: string;
  name: string;
  isChecked: boolean;
}

function ToDo() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<DataItem[]>([
    {
      id: uuidv4(),
      name: "Buy milk",
      isChecked: true,
    },
  ]);

  const { todoToShow, currentFilter, filterTodos, activeTodoCount } =
    useFilter(todos);

  function inputHandler(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    setValue(value);
  }

  function onKeyDownHandler(ev: React.KeyboardEvent) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      setTodos((prev) => [
        ...prev,
        {
          id: uuidv4(),
          name: value,
          isChecked: false,
        },
      ]);
      setValue("");
    }
  }

  function toggleCheckedToDo(id: string) {
    const newArr = [...todos];
    const currentIndex = newArr.findIndex((item) => item.id === id);
    newArr[currentIndex].isChecked = !newArr[currentIndex].isChecked;
    setTodos(newArr);
  }

  function clearCompletedTodo() {
    const activeTodos = todos.filter((todo) => !todo.isChecked);
    setTodos(activeTodos);
  }

  return (
    <div className={style.wrapper}>
      {todoToShow &&
        todoToShow.map((todo) => (
          <ToDoItem
            id={todo.id}
            isChecked={todo.isChecked}
            name={todo.name}
            key={todo.id}
            toggleCheckedToDo={toggleCheckedToDo}
          />
        ))}
      <input
        className={style.input}
        type="text"
        value={value}
        onChange={inputHandler}
        onKeyDown={onKeyDownHandler}
        placeholder="New Task"
      />
      <Footer
        clearCompletedTodo={clearCompletedTodo}
        currentFilter={currentFilter}
        filterTodos={filterTodos}
        left={activeTodoCount}
      />
    </div>
  );
}

export default ToDo;
