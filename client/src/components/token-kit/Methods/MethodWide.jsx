import ContractMethod from "@/web3/ContractMethod";
import styles from "./methodWide.module.scss";
import { memo } from "react";
const MethodWide = ({ method }) => {
  const MethodComponent = () => {
    return <ContractMethod methodName={method.name} />;
  };
  if (!method) {
    return <div className={styles["wide-container"]}>select a method</div>;
  }
  return (
    <div className={styles["wide-container"]}>
      <MethodComponent />
    </div>
  );
};
export default memo(MethodWide);
