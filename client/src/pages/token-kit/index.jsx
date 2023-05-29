import ContractMethod from "@/web3/ContractMethod";
import { useWeb3 } from "@/web3/Web3Provider";
import useContract from "@/web3/useContract";
import { useEffect } from "react";
import styles from "./style.module.scss";
const TokenKit = () => {
  const { createContract } = useContract();
  const { web3, setContractInWeb3 } = useWeb3();
  useEffect(() => {
    const address = localStorage.getItem("contract_address");
    if (address && setContractInWeb3) {
      setContractInWeb3(address);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className={styles["body"]}>
        <div className={styles["main"]}>
          <ContractMethod methodName={"increaseAllowance"} />
          <ContractMethod methodName={"allowance"} />
          <ContractMethod methodName={"balanceOf"} />
        </div>
      </div>
    </>
  );
};
export default TokenKit;
