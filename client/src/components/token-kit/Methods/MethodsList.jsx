import styles from "./methodslList.module.scss";
import abiData from "../../../../public/artifacts/ERC20.json";
import { memo } from "react";
const { abi } = abiData;

function getMethodsByType(type) {
  // filtering only functions (not events and constructor)
  // transfor functions data to custom object
  // filter only the intended type of function
  return abi
    .filter((method) => method.type === "function")
    .map((method, index) => ({
      name: method.name,
      type: method.stateMutability,
      id: index,
    }))
    .filter((method) => method.type === type);
}

const MethodsList = ({ setWideMethod, wideMethod }) => {
  function listToButtons(list) {
    return list.map((method, index) => {
      return (
        <button
          onClick={() => {
            //set the wide method
            if (method.name !== wideMethod?.name) {
              setWideMethod(method);
            }
          }}
          key={index}
          className={
            styles[method.type + "-button"] + " " + styles["method-button"]
          }
        >
          {method.name.toSentence()}
        </button>
      );
    });
  }
  const Sends = listToButtons(getMethodsByType("nonpayable"));
  const Views = listToButtons(getMethodsByType("view")).reverse();
  console.log(Views);
  return (
    <div className={styles["list"]}>
      {Sends}
      {Views}
    </div>
  );
};
export default memo(MethodsList);
