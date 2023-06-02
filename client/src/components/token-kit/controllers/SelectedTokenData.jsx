import { useWeb3 } from "@/web3/Web3Provider";
import styles from "./style.module.scss";
import { summarizeAddress } from "@/helpers/ui";
import Image from "next/image";

const SelectedTokenData = () => {
  const { contract, web3 } = useWeb3();
  if (!contract?.tokenAddress) {
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
      {!contract.tokenAddress && (
        <p>
          No contract <br /> is selected!
        </p>
      )}
      {contract?.tokenAddress && (
        <div className={styles["selected-token-details__container"]}>
          {/* <DetailRow
            label={"Name  "}
            value={
              <>
                {contract.name}
                <Image
                  alt="current network"
                  width={15}
                  height={15}
                  src={contract.imageUrl}
                />
              </>
            }
          />
          <DetailRow label={"Symbol "} value={contract.symbol} /> */}
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
              <p style={{ fontSize: "9px" }}>
                {summarizeAddress(contract.tokenAddress)}
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
      )}
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
export default SelectedTokenData;
