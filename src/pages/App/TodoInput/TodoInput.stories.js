import React, { useState } from "react";
import { TodoInput } from "pages/App/TodoInput/TodoInput";
import {CheckBox} from "components/CheckBox/CheckBox";

export default {
  title: "TodoInput"
};

export const standard = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [todoName, setTodoName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [addedTodo, setAddedTodo] = useState("");

  function dummyFunction(event) {
    event.preventDefault();
    setAddedTodo(todoName);
    setTodoName("");
  }

  function updateName(event) {
    setTodoName(event.target.value);
  }

  return (
    <div>
      <TodoInput
        onSubmit={"dummyFunction"}
        markAllTodosDone={dummyFunction}
        saveTodoName={updateName}
        todoName={todoName}
        fryEgg={dummyFunction}

      />
      <div>Added todo: {addedTodo}</div>
    </div>
  );
};
