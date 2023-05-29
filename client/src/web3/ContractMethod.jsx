import { useEffect, useState } from "react";
import { abi } from "../../public/artifacts/ERC20Token.json";
import { useWeb3 } from "./Web3Provider";

const ContractMethod = ({ methodName }) => {
  const { web3 } = useWeb3();
  const [args, setArgs] = useState([]);
  const [response, setResponse] = useState();
  async function sendMethod() {
    if (!web3?.contract) {
      console.log("select a contract");
      return;
    }
    const response = await web3.contract?.methods[methodName](...args).send({
      from: await web3.eth.requestAccounts().then((e) => e[0]),
    });
    console.log("sent transactoin : ", response);
  }
  async function callMethod() {
    if (!web3?.contract) {
      console.log("select a contract");
      return;
    }
    const response = await web3.contract?.methods[methodName](...args).call();
    console.log("called function : ", response);
    setResponse(response);
  }
  useEffect(() => {
    console.log(args);
  }, [args]);

  const method = abi.find((method) => method?.name === methodName);
  console.log(method);
  if (!method) return;

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3>{method.name.toSentence()}</h3>
        {method.inputs.map((methodInput, index) => {
          return (
            <>
              <label htmlFor={`methodInput-${method.name}-${index}`}>
                {methodInput.name.toSentence()}
              </label>
              <input
                type={
                  new String(methodInput.type).includes("uint")
                    ? "number"
                    : "text"
                }
                id={`methodInput-${method.name}-${index}`}
                key={index}
                onChange={(event) => {
                  const value = event.target.value;
                  const newArgs = [...args];
                  newArgs[index] = value;
                  setArgs(newArgs);
                }}
                value={args[index]}
              />
            </>
          );
        })}
        {method.stateMutability === "nonpayable" && (
          <button className="send-button" onClick={sendMethod}>
            Send
          </button>
        )}
        {method.stateMutability === "view" && (
          <button className="view-button" onClick={callMethod}>
            Send
          </button>
        )}
        {response && <div className="response">{response}</div>}
      </form>
    </div>
  );
};
export default ContractMethod;
