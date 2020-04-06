import React, { useState } from "react";
import { CheckBox } from "components/CheckBox/CheckBox";

export default {
  title: "CheckBoxComponent"
};

const mockData = {
  _id: "567",
  name: "try me once",
  checked: false
};

export const Standard = () => {
  const [isChecked, setIsChecked] = useState(false);

  function updateChecked(checkboxItem) {
    checkboxItem.checked = !checkboxItem.checked;
    setIsChecked(checkboxItem.checked);
    // setIsChecked(isChecked => !isChecked)
  }

  return (
    <CheckBox
      checkBoxItem={mockData}
      isChecked={isChecked}
      onChange={updateChecked}
    />
  );
};
