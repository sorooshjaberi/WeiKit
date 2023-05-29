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
      throw Error(error.message);
    }
  }
}
export function getCurrentNetwork() {
  return window.ethereum.networkVersion;
}
export function isAlreadyOn(id) {
  return getCurrentNetwork() === id;
}
