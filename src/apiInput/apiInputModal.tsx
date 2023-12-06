import ReactModal from "react-modal";
import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import "../apiInput/apiInput.css";
import {
  ApiInput,
  ApiText,
  ExistContainer,
  IconStyle,
  SavedApi,
  SubmitButton,
} from "./apiInputStyle";
import { checkSubmittedApi, handleBybitApi } from "../utils/utils";
import { toast } from "react-toastify";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ApiData, ExistModal, SelectDropdown } from "../utils/interface";
import DropdownMenu from "./dropdownMenu";
import SubmitChatGptApi from "./chatgptApi";
import { useApiKeys } from "../apiContext/apiContext";

ReactModal.setAppElement("#root");

const APIModal: React.FC<{}> = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [apiDataExists, setApiDataExists] = useState<ApiData>({});
  const [openaiDataExist, setOpenaiDataExist] = useState<string>("");
  const [selectedApi, setSelectedApi] = useState<"bybit" | "openai" | "">("");
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [isEdittingOpenAi, setIsEdittingOpenAi] = useState<boolean>(false);
  const email = localStorage.getItem("email");

  const openModal = async () => {
    setModalIsOpen(true);
    setSelectedApi("");
    setIsEditting(false);
    setIsEdittingOpenAi(false);
    const isExist = await checkSubmittedApi(
      email || "",
      process.env.REACT_APP_USERAPICHECK || ""
    );
    const openAiExist = await checkSubmittedApi(
      email || "",
      process.env.REACT_APP_USER_OPENAI_API_CHECK || ""
    );
    if (isExist.apiKey && isExist.apiSecret) setApiDataExists(isExist);
    if (openAiExist.openAi) setOpenaiDataExist(openAiExist.openAi);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedApi("");
    setIsEditting(false);
    setIsEdittingOpenAi(false);
    // console.log("isexisting: ", apiDataExists, openaiDataExist);
  };

  const handleApiSelection = (api: "bybit" | "openai" | "") => {
    setSelectedApi(api);
    setIsEditting(false);
    setIsEdittingOpenAi(false);
  };

  const toggleEditButton = () => {
    setIsEditting(!isEditting);
    setSelectedApi("");
  };

  const toggleOpenAiEditButton = () => {
    setIsEdittingOpenAi(!isEdittingOpenAi);
    setSelectedApi("");
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
        {selectedApi === "bybit" ? (
          <SubmitApiComponet onSelect={handleApiSelection} />
        ) : selectedApi === "openai" ? (
          <SubmitChatGptApi onSelect={handleApiSelection} />
        ) : apiDataExists.apiKey ||
          apiDataExists.apiSecret ||
          openaiDataExist ? (
          <ExistApiModal
            closeModal={closeModal}
            onSelect={handleApiSelection}
            isEditting={isEditting}
            isEdittingOpenAi={isEdittingOpenAi}
            toggleIsEditting={toggleEditButton}
            toggleIsEdittingOpenAi={toggleOpenAiEditButton}
            apiDataExists={apiDataExists}
            openaiDataExist={openaiDataExist}
          />
        ) : (
          <SubmitApiComponet onSelect={handleApiSelection} />
        )}
      </ReactModal>
    </>
  );
};

const SubmitApiComponet: React.FC<SelectDropdown> = ({ onSelect }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const { updateApiKeys } = useApiKeys();

  const useApi = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!apiKey.trim() && !apiSecret.trim()) {
      toast.error("API is required");
      return;
    }
    const email = localStorage.getItem("email") || "";
    const response = await handleBybitApi(email, apiKey, apiSecret);
    const { message } = await response?.json();
    console.log("submitting: ", response);
    console.log("json: ", message);
    if (response && response.ok) {
      updateApiKeys({ apiKey, apiSecret });
      toast.success(message);
      setApiKey("");
      setApiSecret("");
      onSelect("");
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <ExistContainer onSubmit={useApi}>
        <ApiText>
          Enter Your Bybit API
          <DropdownMenu onSelect={onSelect} />
        </ApiText>
        <ApiInput
          id="apiKey"
          type="password"
          placeholder="API KEY"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <ApiInput
          id="apiSecret"
          type="password"
          placeholder="API SECRET"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
          required
        />
        <SubmitButton type="submit">Save</SubmitButton>
      </ExistContainer>
    </>
  );
};

const ExistApiModal: React.FC<ExistModal> = ({
  closeModal,
  onSelect,
  isEditting,
  isEdittingOpenAi,
  toggleIsEditting,
  toggleIsEdittingOpenAi,
  apiDataExists,
  openaiDataExist,
}) => {
  const [showOpenAiData, setShowOpenAiData] = useState<boolean>(false);
  const [showApiData, setShowApiData] = useState<boolean>(false);

  console.log("existmodal: ", apiDataExists, openaiDataExist);

  const toggleApiView = () => {
    setShowApiData(!showApiData);
  };

  return (
    <>
      {isEditting ? (
        <SubmitApiComponet onSelect={onSelect} />
      ) : isEdittingOpenAi ? (
        <SubmitChatGptApi onSelect={onSelect} />
      ) : (
        <>
          <ApiText>Saved API</ApiText>
          <SavedApi>
            API Key:
            {!apiDataExists?.apiSecret || !apiDataExists.apiKey
              ? "Please input your Bybit API in the setting"
              : apiDataExists.apiKey && showApiData
              ? `   ${apiDataExists?.apiKey}`
              : "••••••••••"}
            <Icons
              toggleApiView={toggleApiView}
              showApiData={showApiData}
              toggleEditButton={toggleIsEditting}
            />
          </SavedApi>
          <SavedApi>
            API Secret:
            {!apiDataExists?.apiKey || !apiDataExists.apiSecret
              ? "Please input your Bybit API in the setting"
              : apiDataExists.apiSecret && showApiData
              ? `   ${apiDataExists?.apiSecret}`
              : "••••••••••"}
            <Icons
              toggleApiView={toggleApiView}
              showApiData={showApiData}
              toggleEditButton={toggleIsEditting}
            />
          </SavedApi>
          <SavedApi>
            OpenAI API:{" "}
            {!openaiDataExist
              ? "Please input your OpenAi API in the setting"
              : openaiDataExist && showOpenAiData
              ? openaiDataExist
              : "••••••••••"}
            <Icons
              toggleApiView={() => setShowOpenAiData(!showOpenAiData)}
              showApiData={showOpenAiData}
              toggleEditButton={toggleIsEdittingOpenAi}
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
