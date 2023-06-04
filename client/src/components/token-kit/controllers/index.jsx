import { memo, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Networks from "../popups/Networks";
import TokenSelect from "../popups/TokenSelect";
import TokenImport from "../popups/TokenImport";
import SelectedTokenData from "./SelectedTokenData";
const KitControllers = () => {
  const [popoupNumber, setPopupNumber] = useState(0);
  let popup = null;
  switch (popoupNumber) {
    case 1:
      popup = <Networks onClose={setPopupNumber.bind(null, 0)} />;
      break;
    case 2:
      popup = <TokenSelect onClose={setPopupNumber.bind(null, 0)}/>;
      break;
    case 3:
      popup = <TokenImport onClose={setPopupNumber.bind(null, 0)}/>;
      break;

    default:
      popup = null;
      break;
  }
  return (
    <div className={styles["controllers"]}>
      <button
        className={styles["controllers-controller"]}
        onClick={() => setPopupNumber(1)}
      >
       Select a Network
      </button>
      <button
        className={styles["controllers-controller"]}
        onClick={() => setPopupNumber(2)}
      >
        Select a Token
      </button>
      <button
        className={styles["controllers-controller"]}
        onClick={() => setPopupNumber(3)}
      >
        Import Token
      </button>
      <SelectedTokenData/>
      {popup}
    </div>
  );
};
export default memo(KitControllers);
