import React, { useState } from "react";
import styles from "./App.module.scss";

function App() {
  const [todoName, setTodoName] = useState("");
  /**
   * -Create a todo name(just a string )
   * -Add the todo(object)---props: name, status, created_date, _id to a list of todos onSubmit
   * -Create a list that maps over the list of todos and displays each one
   * */
  function saveTodoName(event) {
    // const value = event.target.value;
    const {
      target: { value: todoName }
    } = event;
    setTodoName(todoName);
  }

  const createTodo = event => {
    event.preventDefault();
    const todo = {
      name: todoName,
      status: ["pending"],
      created_date: Date.now(),
      _id: ""
    };
    setTodoName("");
    setTodos(prevTodos => [todo, ...prevTodos]);
  };

  const [todos, setTodos] = useState([]);
  return (
    <div className={styles.todoContainer}>
      <h1>todos</h1>
      <form className={styles.formToSubmit} onSubmit={createTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.todoInput}
          value={todoName}
          onChange={saveTodoName}
        />
      </form>
      <ul>
        {todos.map(todo => (
          <li>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
