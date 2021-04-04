import "./styles.css";
import { useEffect, useState, useReducer } from "react";
import Todo from "./Todo";
import "./styles.css";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggleTodo",
  DELETE_TODO: "deleteTodo",
  SHOW_LIST: "showTodoList"
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];

    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.SHOW_LIST:
      return action.items;
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, completed: false };
}

export function App() {
  const [name, setName] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todoList"));
    console.log(items);
    if (items) {
      dispatch({ type: ACTIONS.SHOW_LIST, items });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="addItem">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="add">Add Todo</button>
        </div>
      </form>
      <div className="details">
        <h1>Todo List:</h1>
        <div className="todos">
          {todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
          })}
        </div>
      </div>
    </div>
  );
}
