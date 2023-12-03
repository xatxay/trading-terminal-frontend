import { RiMoneyDollarBoxLine } from "react-icons/ri";
import "../apiInput/apiInput.css";
import ReactModal from "react-modal";
import { useState } from "react";
import {
  ApiInput,
  ApiText,
  ExistContainer,
  SubmitButton,
} from "../apiInput/apiInputStyle";
import { toast } from "react-toastify";
import { handlePositionSize } from "../utils/utils";

ReactModal.setAppElement("#root");

const PositionSizeSubmit = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <RiMoneyDollarBoxLine size={35} cursor={"pointer"} onClick={openModal} />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Position Size Modal"
        shouldCloseOnOverlayClick={true}
        className="apiModal"
        overlayClassName="apiOverlay"
      >
        <PositionSizeModal />
      </ReactModal>
    </>
  );
};

const PositionSizeModal = () => {
  const [firstPositionSize, setfirstPositionSize] = useState<number>(500);
  const [secondPositionSize, setSecondPositionSize] = useState<number>(1000);

  const usePositionSize = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!firstPositionSize && !secondPositionSize) {
      toast.error("Please enter the position size");
    } else {
      toast.success("Updated position size successful");
      handlePositionSize(
        firstPositionSize.toString(),
        secondPositionSize.toString()
      );
    }
  };
  return (
    <ExistContainer onSubmit={usePositionSize}>
      <ApiText>Submit Position Size</ApiText>
      <ApiInput
        id="position size"
        type="number"
        placeholder="Size 1 (Default $500)"
        value={firstPositionSize}
        onChange={(e) => setfirstPositionSize(Number(e.target.value))}
      />
      <ApiInput
        id="position size"
        type="number"
        placeholder="Size 2 (Default $1000)"
        value={secondPositionSize}
        onChange={(e) => setSecondPositionSize(Number(e.target.value))}
        required
      />
      <SubmitButton type="submit">Save</SubmitButton>
    </ExistContainer>
  );
};
export default PositionSizeSubmit;
