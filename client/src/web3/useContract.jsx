import abiData from "../../public/artifacts/ERC20Token.json";
import { useWeb3 } from "./Web3Provider";
const { abi, bytecode } = abiData;
const useContract = () => {
  console.log(abi);
  const { web3, setContractInWeb3 } = useWeb3();
  async function createContract() {
    if (!web3?.eth.Contract) {
      console.log("web3 does not exit");
      return;
    }
    const newInstance = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode, arguments: ["S", "SJB", 100] })
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
      })
      .on("sending", () => {
        console.log("sending transaction... ");
      })
      .on("error", () => {
        console.log("oops! something went wrong ");
      });
  }

  return { createContract };
};
export default useContract;
