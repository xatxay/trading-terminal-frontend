import ReactModal from "react-modal";
import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import "../apiInput/apiInput.css";
import {
  ApiInput,
  ApiText,
  IconStyle,
  SavedApi,
  SubmitButton,
} from "./apiInputStyle";
import { checkSubmittedApi, useHandleApi } from "../utils/utils";
import { toast } from "react-toastify";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ApiData } from "../utils/interface";

ReactModal.setAppElement("#root");

const APIModal: React.FC<{}> = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [apiDataExists, setApiDataExists] = useState<boolean>(false);
  const email = localStorage.getItem("email");

  const openModal = async () => {
    setModalIsOpen(true);
    const isExist = await checkSubmittedApi(email || "");
    setApiDataExists(isExist);
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
        {apiDataExists ? (
          <ExistApiModal closeModal={closeModal} />
        ) : (
          <SubmitApiComponet closeModal={closeModal} />
        )}
      </ReactModal>
    </>
  );
};

const SubmitApiComponet: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");

  const useApi = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = localStorage.getItem("email") || "";
    const response = await useHandleApi(email, apiKey, apiSecret);
    console.log("submitting: ", response);
    if (response && response.ok) {
      toast.success("Updated API successful!");
      closeModal();
    } else {
      toast.error("Failed updating API");
    }
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

const ExistApiModal: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [apiData, setApiData] = useState<ApiData>({});
  const [showApiData, setShowApiData] = useState<boolean>(false);
  const [isEditting, setIsEditting] = useState<boolean>(false);

  useEffect(() => {
    const fetchApiData = async () => {
      const email = localStorage.getItem("email");
      const data = await checkSubmittedApi(email || "");
      if (data) setApiData(data);
    };
    fetchApiData();
  }, []);

  const toggleApiView = () => {
    setShowApiData(!showApiData);
  };

  const toggleEditButton = () => {
    setIsEditting(!isEditting);
  };

  return (
    <>
      {isEditting ? (
        <SubmitApiComponet closeModal={closeModal} />
      ) : (
        <>
          <ApiText>Saved API</ApiText>
          <SavedApi>
            API Key: {showApiData ? apiData?.apiKey : "••••••••••"}
            <Icons
              toggleApiView={toggleApiView}
              showApiData={showApiData}
              toggleEditButton={toggleEditButton}
            />
          </SavedApi>
          <SavedApi>
            API Secret: {showApiData ? apiData?.apiSecret : "••••••••••"}
            <Icons
              toggleApiView={toggleApiView}
              showApiData={showApiData}
              toggleEditButton={toggleEditButton}
            />
          </SavedApi>
          <SubmitButton onClick={closeModal}>Close</SubmitButton>
        </>
      )}
    </>
  );
};

const Icons: React.FC<{
  toggleApiView: () => void;
  toggleEditButton: () => void;
  showApiData: boolean;
}> = ({ toggleApiView, toggleEditButton, showApiData }) => {
  return (
    <>
      <IconStyle>
        {showApiData ? (
          <IoMdEyeOff className="eye" size={20} onClick={toggleApiView} />
        ) : (
          <IoMdEye className="eye" size={20} onClick={toggleApiView} />
        )}
        <BiSolidEdit className="edit" size={20} onClick={toggleEditButton} />
      </IconStyle>
    </>
  );
};

export default APIModal;
