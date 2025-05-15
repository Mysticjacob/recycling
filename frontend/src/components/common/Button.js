import React from "react";

const Button = ({ label, onClick, type = "button", style }) => {
  return (
    <button onClick={onClick} type={type} className={`btn ${style}`}>
      {label}
    </button>
  );
};

export default Button;
