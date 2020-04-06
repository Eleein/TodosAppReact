import styles from "./TodoInput.module.scss";
import React from "react";

export const TodoInput = (props) => {
  return (
    <form className={styles.formToSubmit} onSubmit={props.addTodo}>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.allDoneButton}
          onClick={props.markAllTodosDone}
        >
          <i className={styles.downArrow} />
        </button>
      </div>
      <input
        type="text"
        placeholder="What needs to be done?"
        className={styles.todoInput}
        value={props.todoName}
        onChange={props.saveTodoName}
      />
    </form>
  );
};

