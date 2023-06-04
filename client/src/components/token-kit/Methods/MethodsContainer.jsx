import { memo, useState } from "react";
import KitControllers from "../controllers";
import MethodsList from "./MethodsList";
import styles from "./methodsContainer.module.scss";
import MethodWide from "./MethodWide";
const MethodsContainer = () => {
  const [wideMethod, setWideMethod] = useState();
  return (
    <>
      <div className={styles["main"]}>
        <div className={styles["methods-list"]}>
          <MethodsList setWideMethod={setWideMethod} wideMethod={wideMethod} />
        </div>
        <MethodWide method={wideMethod}  />
      </div>
      <KitControllers />
    </>
  );
};
export default memo(MethodsContainer);
