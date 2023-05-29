import useContract from "@/web3/useContract";

const CreateToken = () => {
  const { createContract } = useContract();
  return (
    <>
      <h1>Hey</h1>
      <button type="button" onClick={createContract}>
        Create
      </button>
    </>
  );
};
export default CreateToken;
