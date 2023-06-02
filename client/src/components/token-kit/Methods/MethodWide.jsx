import ContractMethod from "@/web3/ContractMethod";
import styles from './methodWide.module.scss'
const MethodWide = ({ method }) => {
  if(!method){
    return (
      <div className={styles['wide-container']}>
        select a method
      </div>
    )
  }
  return (
    <div>
      <ContractMethod methodName={method.name}/>
    </div>
  );
};
export default MethodWide;
