import Popup from "@/components/ui/Popup";

const Networks = ({ onClose }) => {
  function close() {
    onClose();
  }
  return <Popup onClose={close}>Networks</Popup>;
};
export default Networks;
