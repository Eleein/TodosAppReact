import React, { useState } from "react";
import styles from "./App.module.scss";
import checkboxIcon from "images/checkbox-icon-png-59.png";
import uncheckedBox from "images/unchecked-checkbox-icon.png";
function App() {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState([]);
  /**
   * -Create a todo name(just a string )
   * -Add the todo(object)---props: name, status, created_date, _id to    a list of todos onSubmit
   * -Create a list that maps over the list of todos and displays each one
   * */
  function saveTodoName(event) {
    // const value = event.target.value;
    const {
      target: { value: todoName }
    } = event;

      setTodoName(todoName)
    ;
  }
  function addTodo(event) {
    event.preventDefault();
    if(todoName) { const todo = {
      _id: Math.random().toString(),
      name: todoName,
      status: ["pending"],
      created_date: Date.now()
    };

    setTodos(prevTodos => {
      return [todo, ...prevTodos];
    });
    setTodoName("")};
  }

  function updateTodos(todoToUpdate) {
    const newTodos = todos.reduce((newTodoList, todo) => {
      newTodoList.push(todoToUpdate._id === todo._id ? todoToUpdate : todo);
      return newTodoList;
    }, []);
    setTodos(newTodos);
  }

  function changeStatusAndUpdateTodos(todoToUpdate) {
    todoToUpdate.status =
      todoToUpdate.status[0] === "pending" ? ["completed"] : ["pending"];
    updateTodos(todoToUpdate);
  }

  function markAllTodosDone() {
    const markedTodos = todos.map(todo => {
      todo.status[0] = "completed";
      return todo;
    });
    setTodos(markedTodos);
  }

  return (
    <div className={styles.todoContainer}>
      <h1>todos</h1>
      <button onClick={markAllTodosDone}>Mark All Done</button>
      <form className={styles.formToSubmit} onSubmit={addTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.todoInput}
          value={todoName}
          onChange={saveTodoName}
        />
      </form>
      <ul>
        {todos.map(todo => {
          const isChecked = todo.status[0] === 'completed';
          return (
            <li>
              <input
                type="checkbox"
                id={todo._id}
                onChange={() => {

                  changeStatusAndUpdateTodos(todo);

                }}
                checked={isChecked}
              />
              <label htmlFor={todo._id}>
                <img src={isChecked ? checkboxIcon : uncheckedBox} alt="checkbox-icon" className={styles.tickBoxImg}/>
              </label>
              {todo.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
