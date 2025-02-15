import React, { useState } from "react";
import InputText from "./inputText/InputText";
import Button from "./button/Button";
import Todos from "./todos/Todos";
window.todoId = 1000;
const ToDo_Key = "my-todos";
const FilterType = {
  Done: 1,
  Pending: 2,
  ShowAll: 3,
  UNKNOWN: 4,
};
import "./style.css";
const AutoComplete = () => {
  const [todos, setTodos] = useState(loadFromCache);
  const [todoToAdd, setTodoToAdd] = useState("");
  const [activeFilter, setActiveFilter] = useState(FilterType.UNKNOWN);

  function handleTodoChange(value) {
    setTodoToAdd(value);
  }

  function loadFromCache() {
    const todoString = localStorage.getItem(ToDo_Key);
    const todoArr = JSON.parse(todoString ?? "[]");
    const todosWithoutEditMode = todoArr.map((todo) => ({
      ...todo,
      isEditMode: false,
    }));
    window.todoId = window.todoId + todoArr.length;
    return todosWithoutEditMode;
  }

  function preserveTodos(data) {
    const strTodos = JSON.stringify(data);
    setTodos(data);
    localStorage.setItem(ToDo_Key, strTodos);
  }

  function handleAddTodo() {
    if (todoToAdd.trim() === "")
      return alert("Please Add something in input field");
    const oldTodos = structuredClone(todos);
    const newTodo = {};
    newTodo.id = window.todoId++;
    newTodo.todo = todoToAdd;
    newTodo.isEditMode = false;
    newTodo.isCompleted = false;
    const newTodos = [newTodo, ...oldTodos];

    setTodoToAdd("");
    preserveTodos(newTodos);
  }

  function handleEdit(id) {
    const newTodos = todos.map((todo) => {
      if (id === todo.id) {
        todo.isEditMode = true;
      } else {
        todo.isEditMode = false;
      }
      return { ...todo };
    });

    preserveTodos(newTodos);
  }

  function handleEditCancel(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditMode = false;
      }
      return { ...todo };
    });
    preserveTodos(newTodos);
  }

  function handleDelete(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    window.todoId = window.todoId - 1;
    preserveTodos(newTodos);
  }

  function handleEditSave(id, newValue) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.todo = newValue;
        todo.isEditMode = false;
      }

      return { ...todo };
    });

    preserveTodos(newTodos);
  }

  function handleDone(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = true;
      }
      return { ...todo };
    });
    preserveTodos(newTodos);
  }

  function handleFilter() {
    if (activeFilter === FilterType.UNKNOWN) {
      setActiveFilter(FilterType.Done);
    } else if (activeFilter === FilterType.Done) {
      setActiveFilter(FilterType.Pending);
    } else if (activeFilter === FilterType.Pending) {
      setActiveFilter(FilterType.ShowAll);
    } else if (activeFilter === FilterType.ShowAll) {
      setActiveFilter(FilterType.Done);
    }
  }

  let todoToshow = [];
  let doneTodos = [];
  let pendingTodos = [];
  todos.forEach((t) => {
    if (t.isCompleted) {
      doneTodos.push(t);
    } else {
      pendingTodos.push(t);
    }
  });

  if (activeFilter === FilterType.ShowAll) {
    todoToshow = [...pendingTodos, ...doneTodos];
  } else if (activeFilter === FilterType.Pending) {
    todoToshow = [...pendingTodos];
  } else if (activeFilter === FilterType.Done) {
    todoToshow = [...doneTodos];
  }

  return (
    <div>
      <div>
        <InputText value={todoToAdd} onChange={handleTodoChange} />
        <Button onClick={handleAddTodo} label="Add ToDo" />
        <Button
          label={
            activeFilter === FilterType.Done
              ? "Show me Pending Todos"
              : activeFilter === FilterType.Pending
              ? "Show me Done Todos"
              : "Show me All Todos"
          }
          onClick={handleFilter}
        />
        <Todos
          todos={todoToshow}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onEditCancel={handleEditCancel}
          onEditSave={handleEditSave}
          onDone={handleDone}
        />
      </div>
    </div>
  );
};

export default AutoComplete;
