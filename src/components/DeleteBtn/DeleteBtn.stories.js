import React from "react";
import { DeleteBtn } from "components/DeleteBtn/DeleteBtn";

export default {
  title: "Delete Button"
};

export const standard = () => {
  const item = {
    name: "Delete Me",
    _id: "r34940343eewe"
  };

  const dummyFunc = itemToDelete => {
    alert(`${item.name} is now deleted`);
  };

  return (
    <div>
        <span>{item.name}</span>
      <DeleteBtn itemToDelete={item} onClick={dummyFunc} />
    </div>
  );
};
