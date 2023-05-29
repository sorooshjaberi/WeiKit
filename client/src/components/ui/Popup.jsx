import { useEffect, useState } from "react";
import styles from "./style.module.scss";
const Popup = ({ children, onClose }) => {
  return (
    <div className={styles["back-drop"]} onClick={onClose}>
      <div
        className={styles["popup-container"]}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Popup;
