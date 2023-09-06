import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const { onClick, children } = props;
  return (
    <button title='reset filters' className={styles.button} onClick={onClick}>{children}</button>
  )
};

export default Button;