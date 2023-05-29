import Popup from "@/components/ui/Popup";
import styles from "./Networks.module.scss";
import Image from "next/image";
import { getCurrentNetwork, isAlreadyOn, setNetwork } from "@/helpers/metamask";
import { useEffect, useState } from "react";
const networksData = [
  { name: "Ethereum Mainnet", src: "/ether.png", id: "1" },
  { name: "Binance Smart Chain", src: "/bnb.png", id: "56" },
  { name: "Polygon (Matic)", src: "/polygon.png", id: "137" },
];
const Networks = ({ onClose }) => {
  const [current, setCurrent] = useState(getCurrentNetwork());
  useEffect(() => {
    console.log(current);
  }, [current]);
  return (
    <Popup onClose={onClose}>
      <div className={styles["body"]}>
        <div className={styles["networks"]}>
          {networksData.map((network, i) => {
            const already = current === network.id;
            return (
              <>
                <div
                  className={[
                    `${styles["networks-network"]}
                    ${already ? styles["networks-network--active"] : null}
                  `,
                  ]}
                  onClick={() => {
                    setNetwork(network.id)
                      .then(() => {
                        setCurrent(network.id);
                      })
                      .catch((e) => console.log(e.message));
                  }}
                  key={i}
                >
                  <span>{network.name}</span>
                  <Image
                    alt="network-name"
                    width={40}
                    height={40}
                    src={network.src}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Popup>
  );
};
export default Networks;
