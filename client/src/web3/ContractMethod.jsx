import { useEffect, useState } from "react";
import abiData from "../../public/artifacts/ERC20.json";
import { useWeb3 } from "./Web3Provider";
import styles from "./style.module.scss";
import { BarLoader } from "react-spinners";
const ContractMethod = ({ methodName }) => {
  const { web3 } = useWeb3();
  const [args, setArgs] = useState([]);
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState();
  async function sendMethod() {
    const realArgs = args.map((arg) => arg.realAmount);
    setIsLoading(true);
    const response = await web3.contract?.methods[methodName](...realArgs)
      .send({
        from: await web3.eth.requestAccounts().then((e) => e[0]),
      })
      .catch(() => {
        setResponse("transaction faild!");
      })
      .finally(() => {
        setIsLoading(false);
      });
    // setArgs([]);
    console.log("sent transactoin : ", response);
  }
  async function callMethod() {
    let response;
    const realArgs = args.map((arg) => arg.realAmount);
    setIsLoading(true);

    response = await web3.contract?.methods[methodName](...realArgs)
      .call()
      .catch(() => {
        setResponse("view faild!");
      })
      .finally(() => {
        setIsLoading(false);
      });

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

  const method = abiData.abi.find((method) => method?.name === methodName);

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
        {response && response.length >= 10 && !isNaN(response) && (
          <div className={styles["response"]}>
            {web3.utils.fromWei(response)}
          </div>
        )}
        {response && (response.length < 10 || isNaN(response)) && (
          <div className={styles["response"]}>{response}</div>
        )}
        {isLoading && (
          <div className={styles["loading"]}>
            <BarLoader />
          </div>
        )}
      </form>
    </div>
  );
};
export default ContractMethod;
