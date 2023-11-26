import ReactModal from "react-modal";
import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import "../apiInput/apiInput.css";
import { ApiInput, ApiText, SubmitButton } from "./apiInputStyle";
import { useHandleApi } from "../utils/utils";

ReactModal.setAppElement("#root");

const APIModal: React.FC<{}> = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <IoSettingsOutline
        size={30}
        style={{ cursor: "pointer" }}
        onClick={openModal}
      />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Api Input Modal"
        shouldCloseOnOverlayClick={true}
        className="apiModal"
        overlayClassName="apiOverlay"
      >
        <SubmitApiComponet />
      </ReactModal>
    </>
  );
};

const SubmitApiComponet: React.FC<{}> = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");

  const useApi = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = localStorage.getItem("email") || "";
    const response = await useHandleApi(email, apiKey, apiSecret);
    console.log("submitting: ", response);
  };
  return (
    <>
      <ApiText>Enter Your Bybit API</ApiText>
      <ApiInput
        id="apiKey"
        type="password"
        placeholder="API KEY"
        onChange={(e) => setApiKey(e.target.value)}
      />
      <ApiInput
        id="apiSecret"
        type="password"
        placeholder="API SECRET"
        onChange={(e) => setApiSecret(e.target.value)}
      />
      <SubmitButton onClick={useApi}>Save</SubmitButton>
    </>
  );
};

export default APIModal;
