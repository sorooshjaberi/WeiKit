import { memo, useState } from "react";
import abiData from "../../public/artifacts/ERC20Token.json";
import { useWeb3 } from "./Web3Provider";
const { abi, bytecode } = abiData;
const useContract = () => {
  const [createdContract, setCreatedContract] = useState();
  const { web3, setContractInWeb3 } = useWeb3();
  async function createContract(name, symbol, initialBalance) {
    console.log(name);
    if (!web3?.eth.Contract) {
      console.log("web3 does not exit");
      return;
    }
    console.log(name);
    const newInstance = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode, arguments: [name, symbol, initialBalance] })
      .send({
        from: await web3.eth.requestAccounts().then((e) => e[0]),
      })
      .on("receipt", (response) => {
        console.log(
          "contract created : ",
          response,
          "at : ",
          response.contractAddress
        );
        setContractInWeb3(response.contractAddress);
        setCreatedContract(response);
        localStorage.setItem("created-token", JSON.stringify(response));
      })
      .on("sending", () => {
        console.log("sending transaction... ");
      })
      .on("error", () => {
        console.log("oops! something went wrong ");
      });
  }

  return { createContract, createdContract };
};
export default memo(useContract);
