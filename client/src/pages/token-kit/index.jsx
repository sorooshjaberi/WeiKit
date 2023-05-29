import ContractMethod from "@/web3/ContractMethod";
import { useWeb3 } from "@/web3/Web3Provider";
import useContract from "@/web3/useContract";
import { useEffect } from "react";
import styles from "./style.module.scss";
import KitControllers from "@/components/token-kit/controllers";
const TokenKit = () => {
  const { createContract } = useContract();
  const { web3, setContractInWeb3 } = useWeb3();
  useEffect(() => {
    // const address = localStorage.getItem("contract_address");
    // if (address && setContractInWeb3) {
    //   setContractInWeb3(address);
    // }
    //eslint-disable-next-line
  }, []);
  if (!web3?.contract) {
    return (
      <div className={styles["body"]}>
        <div
          className={styles["main"]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Select a Token / contract to interact with</p>
        </div>
        <KitControllers />
      </div>
    );
  }
  return (
    <>
      <div className={styles["body"]}>
        <KitControllers />
        <div className={styles["main"]}>
          {/* <ContractMethod methodName={"increaseAllowance"} />
          <ContractMethod methodName={"allowance"} />
          <ContractMethod methodName={"balanceOf"} /> */}
          <div className={styles["methods-list"]}>
            <div style={{ height: "1000px" }}></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TokenKit;
