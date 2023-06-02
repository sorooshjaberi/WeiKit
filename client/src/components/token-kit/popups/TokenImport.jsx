import Popup from "@/components/ui/Popup";
import styles from "./tokenImport.module.scss";
import { useEffect, useRef, useState } from "react";
import { useWeb3 } from "@/web3/Web3Provider";
import Web3 from "web3";
const TokenImport = ({ onClose }) => {
  const { setContractInWeb3, web3 } = useWeb3();
  const [error, setError] = useState();
  const addressRef = useRef("");
  const buttonRef = useRef();
  function importHandler() {
   setContractInWeb3(addressRef.current.value);
   onClose();
  }

  return (
    <Popup onClose={onClose}>
      <div className={styles["container"]}>
        <h4>Write An Address</h4>
        <input
          type="text"
          ref={addressRef}
          onInput={(event) => {
            if (!web3?.utils.isAddress(event.target.value)) {
              setError("address is incorrect");
              buttonRef.current.disabled = true;
              buttonRef.current.style.cursor = "not-allowed"
            } else {
              setError(null);
              buttonRef.current.disabled = false;
              buttonRef.current.style.cursor = "pointer"
            }
          }}
        />
        <button ref={buttonRef} onClick={importHandler}>
          Import
        </button>
        {error && <p className={styles["error-p"]}>{error}</p>}
      </div>
    </Popup>
  );
};
export default TokenImport;
