import React from "react";
import styles from "pages/App/App.module.scss";
import {CheckBox} from "components/CheckBox/CheckBox";
import {DeleteBtn} from "components/DeleteBtn/DeleteBtn";


export function TodoList({todos, update, del}){
    return(
        <ul>
            {todos.map(todo => {
                const isChecked = todo.status[0] === "completed";
                return (
                    <li className={styles.todoListItem}>
                        <CheckBox
                            onChange={update}
                            isChecked={isChecked}
                            checkBoxItem={todo}
                        />
                        <DeleteBtn itemToDelete={todo} onClick={del} />
                    </li>
                );
            })}
        </ul>
    )
}