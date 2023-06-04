import { summarizeAddress } from "@/helpers/ui";
import styles from "./style.module.scss";
import { BiCopy } from "react-icons/bi";
import { memo } from "react";
const ResponseItem = ({ data, label }) => {
  return (
    <>
      <div className={styles["response__item"]}>
        <p>{label}</p>
        <p>
          {summarizeAddress(data, 8)}
          <span
            onClick={() => {
              navigator.clipboard.writeText(data).then(() => {
                alert(`coppied ${label}`);
              });
            }}
          >
            <BiCopy />
          </span>
        </p>
      </div>
    </>
  );
};
export default memo(ResponseItem);
