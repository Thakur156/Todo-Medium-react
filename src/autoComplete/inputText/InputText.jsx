import React from "react";
import "./style.css";
const InputText = ({ value, onChange }) => {
  function handleChange(e) {
    onChange(e.target.value);
  }
  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="What do you want to do today"
        onChange={handleChange}
      />
    </div>
  );
};

export default InputText;
