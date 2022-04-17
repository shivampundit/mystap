import React from "react";
import styles from "./styles.module.scss";

const ProgressBar = () => {
  return <div className={styles.progressBar}>
    <div className={styles.completed}></div>
    <div className={styles.current}></div>
    <div></div>
  </div>;
};

export default ProgressBar;
