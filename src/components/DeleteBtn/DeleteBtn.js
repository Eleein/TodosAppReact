import React from "react";
import styles from "./DeleteBtn.module.scss";

export const DeleteBtn = ({itemToDelete, onClick}) => {
    return(
        <div>
            <button
                className={styles.closeButton}
                type="button"
                onClick={() => {
                    onClick(itemToDelete);
                }}
            >
                X
            </button>
        </div>
    )
};