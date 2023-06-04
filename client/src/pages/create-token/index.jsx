import useContract from "@/web3/useContract";
import styles from "./style.module.scss";
import CreateControllers from "@/components/create-token/controllers";
import CreateTokenMain from "@/components/create-token/main";
const CreateToken = () => {
  const { createContract } = useContract();
  return (
    <>
      <div className={styles["body"]}>
        <div className={styles["main"]}>
         <CreateTokenMain/>
        </div>
        <CreateControllers />
      </div>
    </>
  );
};
export default CreateToken;
