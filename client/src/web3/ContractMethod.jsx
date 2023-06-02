import { useEffect, useState } from "react";
import { abi } from "../../public/artifacts/ERC20.json";
import { useWeb3 } from "./Web3Provider";
import styles from "./style.module.scss";
const ContractMethod = ({ methodName }) => {
  const { web3 } = useWeb3();
  const [args, setArgs] = useState([]);
  const [response, setResponse] = useState();
  async function sendMethod() {
    if (!web3?.contract) {
      console.log("select a contract");
      return;
    }
    const realArgs = args.map((arg) => arg.realAmount);
    const response = await web3.contract?.methods[methodName](...realArgs).send(
      {
        from: await web3.eth.requestAccounts().then((e) => e[0]),
      }
    );
    setArgs([]);
    console.log("sent transactoin : ", response);
  }
  async function callMethod() {
    if (!web3?.contract) {
      console.log("select a contract");
      return;
    }
    let response;
    const realArgs = args.map((arg) => arg.realAmount);
    console.log(`log  => file: ContractMethod.jsx:28  => realArgs:`, realArgs);
    if (realArgs.length) {
      console.log(realArgs);
      response = await web3.contract?.methods[methodName](...realArgs).call();
    } else {
      console.log("arg less", realArgs);
      console.log("methodName", methodName);
      response = await web3.contract?.methods[methodName]().call();
    }
    setArgs([]);
    console.log("called function : ", response);
    setResponse(response);
  }
  function changeHandler(event, methodInput, index) {
    let value = {};
    value.displayAmount = event.target.value;
    value.realAmount = event.target.value;

    if (methodInput.type.includes("int")) {
      value.realAmount = web3.utils.toWei(value.displayAmount);
    }
    const newArgs = [...args];

    newArgs[index] = value;
    setArgs(newArgs);
  }
  useEffect(() => {
    console.log(args);
  }, [args]);

  useEffect(() => {
    return () => {
      setArgs([]);
    };
  }, []);
  const method = abi.find((method) => method?.name === methodName);

  if (!method) return;

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3 className={styles["title"]}>{method.name.toSentence()}</h3>
        {method.inputs.map((methodInput, index) => {
          return (
            <>
              <div className={styles["method"]}>
                <label
                  htmlFor={`methodInput-${method.name}-${index}`}
                  className={styles["method-label"]}
                >
                  {methodInput.name.toSentence()}
                </label>
                <input
                  type={methodInput.type.includes("int") ? "number" : "text"}
                  id={`methodInput-${method.name}-${index}`}
                  key={index}
                  className={styles["method-input"]}
                  onChange={function (event) {
                    changeHandler(event, methodInput, index);
                  }}
                  value={args[index]?.displayAmount}
                />
              </div>
            </>
          );
        })}
        {method.stateMutability === "nonpayable" && (
          <button
            className={`${styles["send-button"]} ${styles["button"]}`}
            onClick={sendMethod}
          >
            Send
          </button>
        )}
        {method.stateMutability === "view" && (
          <button
            className={`${styles["view-button"]} ${styles["button"]}`}
            onClick={callMethod}
          >
            View
          </button>
        )}
        {response && <div className={styles["response"]}>{response}</div>}
      </form>
    </div>
  );
};
export default ContractMethod;
