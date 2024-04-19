import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFilter } from "../../hooks/useFilter";

describe("useFilter", () => {
  it("it must set currentFilter to 'all' by default", () => {
    const { result } = renderHook(() => useFilter([]));

    expect(result.current.currentFilter).toBe("all");
  });

  it("it must set currentFilter to active if we call filterTodos with false", () => {
    const { result } = renderHook(() => useFilter([]));

    act(() => result.current.filterTodos(false));
    expect(result.current.currentFilter).toBe("active");
  });

  it("it must set currentFilter to completed if we call filterTodos with true ", () => {
    const { result } = renderHook(() => useFilter([]));

    act(() => result.current.filterTodos(true));
    expect(result.current.currentFilter).toBe("completed");
  });

  it("it must set currentFilter to 'all' if we call filterTodos without parameters or undefined ", () => {
    const { result } = renderHook(() => useFilter([]));

    act(() => result.current.filterTodos());
    expect(result.current.currentFilter).toBe("all");
  });

  it("it must return 'all todos' if currentFilter is 'all", () => {
    const todos = [
      {
        id: "1",
        name: "Buy milk",
        isChecked: true,
      },
      {
        id: "2",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "3",
        name: "",
        isChecked: false,
      },
      {
        id: "4",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "5",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "6",
        name: "Buy cat",
        isChecked: false,
      },
    ];
    const { result } = renderHook(() => useFilter(todos));
    expect(result.current.todoToShow).toStrictEqual(todos);
  });

  it("it must return 'active todos' if currentFilter is 'active", () => {
    const todos = [
      {
        id: "1",
        name: "Buy milk",
        isChecked: true,
      },
      {
        id: "2",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "3",
        name: "",
        isChecked: false,
      },
      {
        id: "4",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "5",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "6",
        name: "Buy cat",
        isChecked: false,
      },
    ];

    const expectedResult = [
      {
        id: "3",
        name: "",
        isChecked: false,
      },

      {
        id: "6",
        name: "Buy cat",
        isChecked: false,
      },
    ];
    const { result } = renderHook(() => useFilter(todos));
    act(() => result.current.filterTodos(false));
    expect(result.current.todoToShow).toStrictEqual(expectedResult);
  });

  it("it must return 'completed todos' if currentFilter is 'complete", () => {
    const todos = [
      {
        id: "1",
        name: "Buy milk",
        isChecked: true,
      },
      {
        id: "2",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "3",
        name: "",
        isChecked: false,
      },
      {
        id: "4",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "5",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "6",
        name: "Buy cat",
        isChecked: false,
      },
    ];

    const expectedResult = [
      {
        id: "1",
        name: "Buy milk",
        isChecked: true,
      },
      {
        id: "2",
        name: "Buy phone",
        isChecked: true,
      },

      {
        id: "4",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "5",
        name: "Buy phone",
        isChecked: true,
      },
    ];
    const { result } = renderHook(() => useFilter(todos));
    act(() => result.current.filterTodos(true));
    expect(result.current.todoToShow).toStrictEqual(expectedResult);
  });

  it("it must return the number of left tasks ", () => {
    const todos = [
      {
        id: "1",
        name: "Buy milk",
        isChecked: true,
      },
      {
        id: "2",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "3",
        name: "",
        isChecked: false,
      },
      {
        id: "4",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "5",
        name: "Buy phone",
        isChecked: true,
      },
      {
        id: "6",
        name: "Buy cat",
        isChecked: false,
      },
    ];
    const { result } = renderHook(() => useFilter(todos));

    expect(result.current.activeTodoCount).toBe(2);
  });
});
