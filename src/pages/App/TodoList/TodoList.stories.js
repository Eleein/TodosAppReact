import React, { useState, useEffect } from "react";
import { TodoList } from "pages/App/TodoList/TodoList";
import { apiRequest, httpMethods } from "API/Post";

export default {
  title: "List of Todos"
};

export const Standard = () => {
  const [todos, setTodos] = useState([]);
  const dummyDelete = () => {
    alert("OOOPS you just deleted me!");
  };

  useEffect(() => {
    async function getDummyTodos() {
      const listOfTodos = await apiRequest(
        "https://jsonplaceholder.typicode.com/todos",
        httpMethods.get
      );
      debugger;
      const todos = listOfTodos
        .filter(todo => {
          return todo.id <= 10;
        })
        .map(todo => {
          return {
            title: todo.title,
            _id: todo.id,
            status: [todo.completed ? "completed" : "pending"]
          };
        });

      setTodos(todos);
    }
    getDummyTodos();
  }, []);

  const dummyUpdate = todo => {
    alert(`${todo.title} has been updated`);
  };

  return (
    <div>
      <TodoList todos={todos} update={dummyUpdate} del={dummyDelete} />
    </div>
  );
};
