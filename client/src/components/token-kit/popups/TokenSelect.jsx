import Popup from "@/components/ui/Popup";
import Image from "next/image";
import styles from "./TokenSelect.module.scss";
import { tokens } from "./../../../../token";
import { getCurrentNetwork } from "@/helpers/metamask";
import { useWeb3 } from "@/web3/Web3Provider";
import { useState } from "react";
const TokenSelect = ({ onClose }) => {
  const { setContractInWeb3, web3 } = useWeb3();
  const [current, setCurrent] = useState();
  console.log(current, web3?.contract?._address);
  return (
    <Popup onClose={onClose}>
      <div className={styles["body"]}>
        <div className={styles["tokens"]}>
          {tokens
            .filter(async (token) => {
              token.network === (await getCurrentNetwork());
            })
            .map((token, i) => {
              console.log(token);
              return (
                <div
                  className={[
                    `${styles["tokens-token"]} 
                    ${
                      token.tokenAddress ===current
                        ? styles["tokens-token--active"]
                        : null
                    }
                  `,
                  ]}
                  onClick={() => {
                    setContractInWeb3(token.tokenAddress);
                    setCurrent(token.tokenAddress);
                  }}
                  key={i}
                >
                  <span>{token.name}</span>
                  <Image
                    alt="token"
                    width={40}
                    height={40}
                    src={token.imageUrl}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Popup>
  );
};
export default TokenSelect;
