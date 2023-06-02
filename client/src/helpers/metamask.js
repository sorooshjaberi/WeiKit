import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
export async function setNetwork(id) {
  if (isAlreadyOn(id)) {
    throw Error("is already on the intended network");
  } else {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(id) }],
      });
    } catch (error) {
      console.log(error.message);
      if (error?.code === 4902) {
        try {
          await createNetwork(web3.utils.toHex(id));
        } catch (error) {
          throw Error(error.message);
        }
      }
    }
  }
}
export function getCurrentNetwork() {
  return window.ethereum.networkVersion;
}
export function isAlreadyOn(id) {
  return getCurrentNetwork() === id;
}
export async function createNetwork(hexId) {
  const networks = [
    {
      chainId: "0x89",
      chainName: "Polygon",
      rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    {
      chainId: "0x38",
      chainName: "Binance Smart Chain",
      rpcUrls: ["https://bsc-dataseed1.binance.org/"],
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com/"],
    },
  ];
  const network = networks.find((network) => network.chainId == hexId);
  console.log(network);
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
  } catch (error) {
    throw Error(error.message || "Something went wrong");
  }
}
