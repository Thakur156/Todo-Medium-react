import React, { useRef } from "react";
import "./style.css";
import Button from "../button/Button";
const Todos = ({
  todos = [],
  onDelete,
  onEdit,
  onEditCancel,
  onEditSave,
  onDone,
}) => {
  return (
    <div className="todo-list">
      {todos.map((data, index) => {
        return (
          <TodoItem
            key={data.id}
            index={index}
            data={data}
            onDelete={onDelete}
            onEdit={onEdit}
            onEditSave={onEditSave}
            onEditCancel={onEditCancel}
            onDone={onDone}
          />
        );
      })}
    </div>
  );
};

export default Todos;

function TodoItem({
  data,
  index,
  onEdit,
  onDelete,
  onEditCancel,
  onEditSave,
  onDone,
}) {
  function handleEdit(id) {
    return () => {
      onEdit(data.id);
    };
  }
  function handleDelete(id) {
    return () => {
      onDelete(data.id);
    };
  }
  function handleEditCancel(id) {
    return () => {
      onEditCancel(id);
    };
  }
  function handleDone(id) {
    return () => {
      onDone(id);
    };
  }
  function handleSave(id) {
    return () => {
      const value = inputRef.current.value;
      onEditSave(id, value);
      inputRef.current.value = "";
    };
  }

  const inputRef = useRef("");
  if (data.isEditMode) {
    return (
      <div>
        <input ref={inputRef} type="text" defaultValue={data.todo} />
        <Button onClick={handleSave(data.id)} label="Save" />
        <Button onClick={handleEditCancel(data.id)} label="Cancel" />
      </div>
    );
  }

  return (
    <div data-completed-todo={data.isCompleted}>
      <span>{data.todo}</span>
      <Button label="Edit" onClick={handleEdit(data.id)} />
      <Button
        onClick={handleDelete(data.id)}
        className="danger"
        label="Delete"
      />
      <Button onClick={handleDone(data.id)} className="Sucess" label="Done" />
    </div>
  );
}
