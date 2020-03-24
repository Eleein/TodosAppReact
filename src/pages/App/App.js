import React, { useEffect, useState } from "react";
import styles from "pages/App/App.module.scss";
import checkboxIcon from "images/checkbox-icon-png-59.png";
import uncheckedBox from "images/unchecked-checkbox-icon.png";
import { TodoInput } from "pages/App/TodoInput/TodoInput";
import { CheckBox } from "components/CheckBox/CheckBox";

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
    })
      .then(() =>
        setTodos(
          todos.filter(todo => {
            return todoToDelete._id !== todo._id;
          })
        )
      )
      .catch(error => console.log(error));
  }

  return (
    <div className={styles.todoContainer}>
      <h1 className={styles.todoHeader}>todos</h1>
      <div className={styles.todoAndListContainer}>
        <TodoInput
          todoName={todoName}
          saveTodoName={saveTodoName}
          markAllTodosDone={markAllTodosDone}
          addTodo={addTodo}
        />
        <ul>
          {todos.map(todo => {
            const isChecked = todo.status[0] === "completed";
            return (
              <li className={styles.todoListItem}>
                <CheckBox
                  onChange={changeStatusAndUpdateTodos}
                  isChecked={isChecked}
                  checkBoxItem={todo}
                />

                <div>
                  <button
                    className={styles.closeButton}
                    type="button"
                    onClick={() => {
                      deleteTodo(todo);
                    }}
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;