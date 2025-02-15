import React from "react";
import "./style.css";
const Button = ({ className, onClick = () => {}, label }) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
