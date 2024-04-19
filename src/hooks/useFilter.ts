import { useMemo, useState } from "react";
import { DataItem } from "../components/types";

export function useFilter(todos: DataItem[]) {
  const [currentFilter, setCurrentFilter] = useState("all");
  const activeTodos = useMemo(() => {
    return todos.filter((todo) => !todo.isChecked);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.isChecked);
  }, [todos]);

  const todoToShow = useMemo(() => {
    if (currentFilter === "active") {
      return activeTodos;
    }

    if (currentFilter === "completed") {
      return completedTodos;
    }
    return todos;
  }, [todos, currentFilter]);

  function filterTodos(completed?: boolean) {
    if (completed === undefined) {
      setCurrentFilter("all");
      return;
    }
    setCurrentFilter(completed ? "completed" : "active");
  }

  return {
    todoToShow,
    currentFilter,
    filterTodos,
    activeTodoCount: activeTodos.length,
  };
}
