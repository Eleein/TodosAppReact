import React, {useEffect, useState} from "react";
import styles from "pages/App/App.module.scss";
import {TodoInput} from "pages/App/TodoInput/TodoInput";
import {apiRequest, httpMethods} from "API/Post";
import {TodoList} from "pages/App/TodoList/TodoList";

function App() {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await apiRequest(
          "http://localhost:3030/tasks",
          httpMethods.get
        );
        setTodos(todos);
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
  async function addTodo(event) {
    try {
      event.preventDefault();
      if (todoName) {
        const todo = {
          name: todoName,
          status: ["pending"],
          created_date: Date.now()
        };

        const addedTodo = await apiRequest(
          "http://localhost:3030/tasks",
          httpMethods.post,
          todo
        );
        setTodos(prevTodos => {
          return [addedTodo, ...prevTodos];
        });
        setTodoName("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function updateTodos(todoToUpdate) {
    const newTodos = todos.reduce((newTodoList, todo) => {
      newTodoList.push(todoToUpdate._id === todo._id ? todoToUpdate : todo);
      return newTodoList;
    }, []);
    setTodos(newTodos);
  }

  async function changeStatusAndUpdateTodos(todoToUpdate) {
    try {
      todoToUpdate.status =
        todoToUpdate.status[0] === "pending" ? ["completed"] : ["pending"];

      const updatedTodo = await apiRequest(
        `http://localhost:3030/tasks/${todoToUpdate._id}`,
        httpMethods.put,
        todoToUpdate
      );
      updateTodos(() => updatedTodo);
    } catch (error) {
      console.log(error);
    }


  }

  function markAllTodosDone() {
    const markedTodos = todos.map(todo => {
      todo.status[0] = "completed";
      return todo;
    });
    setTodos(markedTodos);
  }

  async function deleteTodo(todoToDelete) {
    try {
      await apiRequest(
        `http://localhost:3030/tasks/${todoToDelete._id}`,
        httpMethods.delete
      );
      const updatedTodos = todos.filter(todo => {
        return todoToDelete._id !== todo._id;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
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
        <TodoList todos={todos} update={changeStatusAndUpdateTodos} del={deleteTodo}/>

      </div>
    </div>
  );
}

export default App;
