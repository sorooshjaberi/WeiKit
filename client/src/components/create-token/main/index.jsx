import useContract from "@/web3/useContract";
import styles from "./style.module.scss";
import FormInputGroup from "./FormInputGroup";
import { memo, useRef, useState } from "react";
import Web3 from "web3";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BarLoader } from "react-spinners";
import ResponseItem from "./ResponseItem";
const CreateTokenMain = () => {
  const [isLoading, setIsLoading] = useState();
  const [response, setResponse] = useState();
  const { createContract , createdContract} = useContract();
  const createButtonRef = useRef();
  const formik = useFormik({
    initialValues: {
      name: "",
      symbol: "",
      initialSupply: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      symbol: Yup.string().required("Symbol is required"),
      initialSupply: Yup.number()
        .required("Initial Supply is required")
        .positive("Initial Supply must be positive")
        .integer("Initial Supply must be an integer"),
    }),
    onSubmit: (values) => {
      const amountInWei = new Web3().utils.toWei(
        values.initialSupply.toString()
      );
      setIsLoading(true);
      createButtonRef.current.disabled = true;
      createButtonRef.current.style.cursor = "not-allowed";
      console.log(values.name, values.symbol, amountInWei);
      createContract(values.name, values.symbol, amountInWei)
        .finally(() => {
          setIsLoading(false);
          createButtonRef.current.disabled = false;
          createButtonRef.current.style.cursor = "pointer";
        })
        .catch(() => {
          setResponse("Transaction Failed");
        });
    },
  });
  console.log(JSON.stringify(createdContract));
  return (
    <>
      <h1 className={styles["title"]}>Create ERC20 token</h1>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <FormInputGroup label={"Token Name"} name={"name"} formik={formik} />
        <FormInputGroup
          label={"Token Symbol"}
          name={"symbol"}
          formik={formik}
        />
        <FormInputGroup
          label={"Token Initial Supply"}
          type={"number"}
          name={"initialSupply"}
          formik={formik}
        />
        <button ref={createButtonRef} className={styles["button"]}>
          Create
        </button>
      </form>
      {isLoading && <BarLoader />}
      {response && <p className={styles["response"]}>{response}</p>}
      {createdContract && (
        <div className={styles["response"]}>
          <ResponseItem
            data={createdContract.contractAddress}
            label={"Token Address"}
          />
          <ResponseItem data={createdContract.from} label={"Creator Address"} />
          <ResponseItem
            data={createdContract.transactionHash}
            label={"Transaction Hash"}
          />
        </div>
      )}
    </>
  );
};
export default memo(CreateTokenMain);
