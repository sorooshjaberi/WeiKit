import ContractMethod from "@/web3/ContractMethod";
import { useWeb3 } from "@/web3/Web3Provider";
import useContract from "@/web3/useContract";
import { useEffect } from "react";

export default function Home() {
  const { createContract } = useContract();
  const { web3, setContractInWeb3 } = useWeb3();
  useEffect(() => {
    const address = localStorage.getItem("contract_address");
    if (address && setContractInWeb3) {
      setContractInWeb3(address);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <h1>Hey</h1>
      <button type="button" onClick={createContract}>
        Create
      </button>
      <ContractMethod methodName={"increaseAllowance"} />
      <ContractMethod methodName={"allowance"} />
      <ContractMethod methodName={"balanceOf"} />
    </>
  );
}
