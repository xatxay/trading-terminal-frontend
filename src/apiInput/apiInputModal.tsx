import ReactModal from "react-modal";
import React, { useEffect, useState } from "react";
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
  const [apiDataExists, setApiDataExists] = useState<boolean>(false);
  const [openaiDataExist, setOpenaiDataExist] = useState<boolean>(false);
  const [selectedApi, setSelectedApi] = useState<"bybit" | "openai" | "">("");
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [isEdittingOpenAi, setIsEdittingOpenAi] = useState<boolean>(false);
  const email = localStorage.getItem("email");

  const openModal = async () => {
    setModalIsOpen(true);
    setSelectedApi("");
    const isExist = await checkSubmittedApi(
      email || "",
      process.env.REACT_APP_USERAPICHECK || ""
    );
    const openAiExist = await checkSubmittedApi(
      email || "",
      process.env.REACT_APP_USER_OPENAI_API_CHECK || ""
    );
    console.log("openaiexist: ", openAiExist);
    setApiDataExists(isExist);
    setOpenaiDataExist(openAiExist);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
        ) : apiDataExists || openaiDataExist ? (
          <ExistApiModal
            closeModal={closeModal}
            onSelect={handleApiSelection}
            isEditting={isEditting}
            isEdittingOpenAi={isEdittingOpenAi}
            toggleIsEditting={toggleEditButton}
            toggleIsEdittingOpenAi={toggleOpenAiEditButton}
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
      toast.error("Failed updating API");
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
}) => {
  const [apiData, setApiData] = useState<ApiData>({});
  const [openAiData, setOpenAiData] = useState<string>("");
  const [showOpenAiData, setShowOpenAiData] = useState<boolean>(false);
  const [showApiData, setShowApiData] = useState<boolean>(false);

  useEffect(() => {
    const fetchApiData = async () => {
      const email = localStorage.getItem("email");
      const data = await checkSubmittedApi(
        email || "",
        process.env.REACT_APP_USERAPICHECK || ""
      );
      const dataOpenAi = await checkSubmittedApi(
        email || "",
        process.env.REACT_APP_USER_OPENAI_API_CHECK || ""
      );
      if (dataOpenAi) setOpenAiData(dataOpenAi.openAi);
      if (data) setApiData(data);
    };
    fetchApiData();
  }, []);

  const toggleApiView = () => {
    setShowApiData(!showApiData);
  };

  console.log("apidata: ", apiData);
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
            {!apiData || !apiData.apiKey
              ? "Please input your Bybit API in the setting"
              : apiData && showApiData
              ? apiData?.apiKey
              : "••••••••••"}
            <Icons
              toggleApiView={toggleApiView}
              showApiData={showApiData}
              toggleEditButton={toggleIsEditting}
            />
          </SavedApi>
          <SavedApi>
            API Secret:
            {!apiData || !apiData.apiSecret
              ? "Please input your Bybit API in the setting"
              : apiData && showApiData
              ? apiData?.apiSecret
              : "••••••••••"}
            <Icons
              toggleApiView={toggleApiView}
              showApiData={showApiData}
              toggleEditButton={toggleIsEditting}
            />
          </SavedApi>
          <SavedApi>
            OpenAI API:{" "}
            {!openAiData
              ? "Please input your OpenAi API in the setting"
              : openAiData && showOpenAiData
              ? openAiData
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
