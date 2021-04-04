import { React } from "react";
import "./styles.css";
import { ACTIONS } from "./App";
export default function Todo({ todo, dispatch }) {
  const style1 = {
    fontStyle: "italic",
    textDecoration: "line-through",
    color: "#6B7280"
  };
  const style2 = {
    fontWeight: "bold",
    color: "#333"
  };
  console.log(todo);

  const toggle = () => {
    dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: { id: todo.id }
    });
  };
  const deleteTodo = () => {
    dispatch({
      type: ACTIONS.DELETE_TODO,
      payload: { id: todo.id }
    });
  };

  return (
    <div class="todo">
      <span style={todo.completed === true ? style1 : style2}>{todo.name}</span>
      <button className="toggleTodo" onClick={toggle}>
        Toggle
      </button>
      <button className="deleteTodo" onClick={deleteTodo}>
        Delete
      </button>
    </div>
  );
}
