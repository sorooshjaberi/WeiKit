import Popup from "@/components/ui/Popup";
import Image from "next/image";
import styles from "./TokenSelect.module.scss";
import { tokens } from "./../../../../token";
import { getCurrentNetwork } from "@/helpers/metamask";
import { useWeb3 } from "@/web3/Web3Provider";
import { memo, useState } from "react";
import Web3 from "web3";
const TokenSelect = ({ onClose }) => {
  const { setContractInWeb3, web3 } = useWeb3();
  const [current, setCurrent] = useState();
  console.log(current, web3?.contract?._address);
  return (
    <Popup onClose={onClose}>
      <div className={styles["body"]}>
        <div className={styles["tokens"]}>
          {tokens
            .filter((token) => {
              // console.log(token.network);
              // console.log(token.network === window?.ethereum?.networkVersion);
              return token.network === window?.ethereum?.networkVersion;
            })
            .map((token, i) => {
              // console.log(token);
              return (
                <div
                  className={[
                    `${styles["tokens-token"]} 
                    ${
                      token.tokenAddress === current
                        ? styles["tokens-token--active"]
                        : null
                    }
                  `,
                  ]}
                  onClick={() => {
                    setContractInWeb3(token.tokenAddress , token);
                    setCurrent(token.tokenAddress);
                  }}
                  key={i}
                >
                  <span>{token.name}</span>
                  <Image
                    alt="token"
                    width={40}
                    height={40}
                    // src={token.imageUrl}
                    src={`/assets/${token.symbol}.png`}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Popup>
  );
};
export default memo(TokenSelect);
