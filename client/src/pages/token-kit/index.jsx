import ContractMethod from "@/web3/ContractMethod";
import { useWeb3 } from "@/web3/Web3Provider";
import useContract from "@/web3/useContract";
import { useEffect } from "react";
import styles from "./style.module.scss";
import KitControllers from "@/components/token-kit/controllers";
import MethodsContainer from "@/components/token-kit/Methods/MethodsContainer";
import MethodsList from "@/components/token-kit/Methods/MethodsList";
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

  const Empty = (
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
  const NotEmpty = <MethodsContainer />;
  const MainContent = web3?.contract ? NotEmpty : Empty;
  return (
    <>
      <div className={styles["body"]}>{MainContent}</div>
    </>
  );
};
export default TokenKit;
