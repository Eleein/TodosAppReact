import React from "react";
import styles from "./CheckBox.module.scss";
import checkboxIcon from "images/checkbox-icon-png-59.png";
import uncheckedBox from "images/unchecked-checkbox-icon.png";

/**
 * requires an object of the shape:
 * {
 *     _id: string,
 *     name: string
 * }
 */
export const CheckBox = ({checkBoxItem, isChecked, onChange: handleChange}) => {
  return (
    <div>
      <input
        className={styles.listItemCheckBox}
        type="checkbox"
        id={checkBoxItem._id}
        onChange={() => {
            // update(checkboxItem)
            handleChange(checkBoxItem);
        }}
        checked={isChecked}
      />
      <label htmlFor={checkBoxItem._id}>
        <img
          src={isChecked ? checkboxIcon : uncheckedBox}
          alt="checkbox-icon"
          className={`${styles.tickBoxImg} ${
            isChecked ? "" : styles.uncheckedImage
          }`}
        />
      </label >
      <span className={isChecked ? styles.checkedTodo : styles.uncheckedTodo}>
        {checkBoxItem.name}
      </span>
    </div>
  );
};
