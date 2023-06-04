import { useWeb3 } from "@/web3/Web3Provider";
import styles from "./style.module.scss";
import KitControllers from "@/components/token-kit/controllers";
import MethodsContainer from "@/components/token-kit/Methods/MethodsContainer";
const TokenKit = () => {
  const { web3,  } = useWeb3();


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
