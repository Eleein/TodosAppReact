import React, { useEffect, useState } from "react";
import styles from "pages/App/App.module.scss";
import { TodoInput } from "pages/App/TodoInput/TodoInput";
import { CheckBox } from "components/CheckBox/CheckBox";
import { saveTodo } from "API/Post";
import {DeleteBtn} from "components/DeleteBtn/DeleteBtn";

function App() {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch("http://localhost:3030/tasks");
        if (response.ok) {
          const savedTodos = await response.json();
          setTodos(savedTodos);
        }
        throw new Error("Request failed!");
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
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

      saveTodo(todo)
        .then(todo => {
          setTodos(prevTodos => {
            return [todo, ...prevTodos];
          });
        })
        .catch(error => {
          console.log(error);
        });
      setTodoName("");
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
             <DeleteBtn itemToDelete={todo} onClick={deleteTodo}/>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
