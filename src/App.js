import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import checkboxIcon from "images/checkbox-icon-png-59.png";
import uncheckedBox from "images/unchecked-checkbox-icon.png";

function App() {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/tasks")
      .then(response => response.json())
      .then(savedTodos => setTodos(savedTodos))
      .catch(error => console.log(error));
  }, []);

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

    setTodoName(todoName);
  }
  function addTodo(event) {
    event.preventDefault();
    if (todoName) {
      const todo = {
        name: todoName,
        status: ["pending"],
        created_date: Date.now()
      };

      fetch("http://localhost:3030/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify(todo)
      })
        .then(response => {
          return response.json();
        })
        .then(todo => {
          setTodos(prevTodos => {
            return [todo, ...prevTodos];
          });
          setTodoName("");
        })
        .catch(error => {
          console.log(error);
        });
    }
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

    fetch(`http://localhost:3030/tasks/${todoToUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(todoToUpdate)
    })
      .then(() => updateTodos(todoToUpdate))
      .catch(error => console.log(error));
  }

  function markAllTodosDone() {
    const markedTodos = todos.map(todo => {
      todo.status[0] = "completed";
      return todo;
    });
    setTodos(markedTodos);
  }

  function deleteTodo(todoToDelete) {
   fetch(`http://localhost:3030/tasks/${todoToDelete._id}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/JSON"
     }
   }).then(() => setTodos(todos.filter( todo => {
     return todoToDelete._id !== todo._id
   }))).catch(error => console.log(error))
  }

  return (
    <div className={styles.todoContainer}>
      <h1 className={styles.todoHeader}>todos</h1>
      
      <form className={styles.formToSubmit} onSubmit={addTodo}>
        <button onClick={markAllTodosDone}><i className={styles.downArrow}></i></button>
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
          const isChecked = todo.status[0] === "completed";
          return (
            <li className={styles.todoListItem}>
              <input
                className={styles.listItemCheckBox}
                type="checkbox"
                id={todo._id}
                onChange={() => {
                  changeStatusAndUpdateTodos(todo);
                }}
                checked={isChecked}
              />
              <label htmlFor={todo._id}>
                <img
                  src={isChecked ? checkboxIcon : uncheckedBox}
                  alt="checkbox-icon"
                  className={styles.tickBoxImg}
                />
              </label>
              <span className={isChecked ? styles.checkedTodo : ''}>{todo.name}</span>
              <button type="button" onClick={()=>{

                deleteTodo(todo)
              }}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
