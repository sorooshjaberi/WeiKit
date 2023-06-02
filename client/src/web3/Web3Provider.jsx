import { useContext, useEffect, useState, createContext } from "react";
import Web3 from "web3";
import { abi } from "/artifacts/ERC20Token.json";

export const Web3Context = createContext({
  web3: {},
  setContractInWeb3: () => {},
  contract: {},
});

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState();
  function setContractInWeb3(address, payload = {}) {
    const contract = new web3.eth.Contract(abi, address);
    Object.assign(contract, payload);
    localStorage.setItem("contract_address", address);
    console.log("contract : ", contract);
    setWeb3({ ...web3, contract });
  }
  useEffect(() => {
    const web3Instance = new Web3(Web3.givenProvider);
    !web3 && setWeb3(web3Instance);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Web3Context.Provider
        value={{ web3, setContractInWeb3, contract: web3?.contract }}
      >
        {children}
      </Web3Context.Provider>
    </>
  );
};

export const useWeb3 = () => useContext(Web3Context);
