import { memo } from "react";
import styles from "./style.module.scss";

const FormInputGroup = ({ label, onInput, type, name, formik }) => {
  return (
    <div className={styles["method"]}>
      <label className={styles["method-label"]}>{label}</label>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name={name}
        onInput={onInput}
        className={styles["method-input"]}
        type={type || "text"}
      />
      {formik.errors[name] && formik.touched[name] && (
        <p className={styles["method-input-error"]}>{formik.errors[name]}</p>
      )}
    </div>
  );
};
export default memo(FormInputGroup);
