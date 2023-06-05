import { useWeb3 } from "@/web3/Web3Provider";
import styles from "./style.module.scss";
import { summarizeAddress } from "@/helpers/ui";
import Image from "next/image";
import { memo } from "react";
import { BiCopy } from "react-icons/bi";

const SelectedTokenData = () => {
  const { contract, web3 } = useWeb3();
  if (!contract?._address) {
    return (
      <div className={styles["selected-token-details"]}>
        <p>
          No contract <br /> is selected!
        </p>
      </div>
    );
  }
  return (
    <div className={styles["selected-token-details"]}>
      <div className={styles["selected-token-details__container"]}>
        <div className={styles["summary-data"]}>
          <h3>{contract.symbol}</h3>
          <Image
            alt="current network"
            width={20}
            height={20}
            src={contract.imageUrl}
          />
          <h6>{contract.name}</h6>
        </div>
        <DetailRow
          label={"Address "}
          value={
            <p style={{ fontSize: "9px" , position:"relative" ,left:"-5px"}}>
              {summarizeAddress(contract._address)}
              <span
              className={styles["address"]}
            onClick={() => {
              navigator.clipboard.writeText(contract._address).then(() => {
                alert(`coppied token address`);
              });
            }}
          >
            <BiCopy />
          </span>
            </p>
          }
        />
        <DetailRow
          label={"Network "}
          value={
            contract.network === "1"
              ? "ETH"
              : contract.network === "56"
              ? "BSC"
              : contract.network === "137"
              ? "POLYGON"
              : "unknown"
          }
        />
      </div>
    </div>
  );
};
const DetailRow = ({ label, value }) => {
  return (
    <div className={styles["selected-token-details__container__row"]}>
      <label className={styles["label"]}>{label}</label>
      <div className={styles["data"]}>{value}</div>
    </div>
  );
};
export default memo(SelectedTokenData);
