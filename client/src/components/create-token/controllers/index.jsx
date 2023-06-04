import Networks from "@/components/token-kit/popups/Networks";
import styles from "./style.module.scss";
import {useState} from 'react'
const CreateControllers = () => {
  const [popoupNumber, setPopupNumber] = useState(0);
  let popup = null;
  switch (popoupNumber) {
    case 1:
      popup = <Networks onClose={setPopupNumber.bind(null, 0)} />;
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
      {popup}
    </div>
  );
};
export default CreateControllers;
