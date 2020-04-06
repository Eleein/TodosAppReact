import styles from "./TodoInput.module.scss";
import React, { Component } from "react";

// export const TodoInput = (props) => {
//   return (
//     <form className={styles.formToSubmit} onSubmit={props.addTodo}>
//       <div className={styles.buttonContainer}>
//         <button
//           type="button"
//           className={styles.allDoneButton}
//           onClick={props.markAllTodosDone}
//         >
//           <i className={styles.downArrow} />
//         </button>
//       </div>
//       <input
//         type="text"
//         placeholder="What needs to be done?"
//         className={styles.todoInput}
//         value={props.todoName}
//         onChange={props.saveTodoName}
//       />
//     </form>
//   );
// };

export class TodoClass extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { addTodo, markAllTodosDone, todoName, saveTodoName} = this.props;
    return (
      <form className={styles.formToSubmit} onSubmit={addTodo}>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.allDoneButton}
            onClick={markAllTodosDone}
          >
            <i className={styles.downArrow} />
          </button>
        </div>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.todoInput}
          value={todoName}
          onChange={saveTodoName}
        />
      </form>
    );
  }
}
