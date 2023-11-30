import { toast } from "react-toastify";
import { handleOpenAiApi } from "../utils/utils";
import {
  ApiInput,
  ApiText,
  ExistContainer,
  SubmitButton,
} from "./apiInputStyle";
import DropdownMenu from "./dropdownMenu";
import React, { useState } from "react";
import { SelectDropdown } from "../utils/interface";

const SubmitChatGptApi: React.FC<SelectDropdown> = ({ onSelect }) => {
  const [openAiApi, setOpenAiApi] = useState<string>("");
  const email = localStorage.getItem("email");

  const useOpenAi = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!openAiApi.trim()) {
      toast.error("API is required");
      return;
    }
    const response = await handleOpenAiApi(email || "", openAiApi);
    if (response && response.ok) {
      toast.success("Updated OpenAi API Successful!");
      setOpenAiApi("");
      onSelect("");
    } else {
      toast.error("Error saving api key");
    }
    console.log("openai response: ", response);
  };

  return (
    <ExistContainer onSubmit={useOpenAi}>
      <ApiText chatgpt>
        Enter Your OpenAI API <DropdownMenu onSelect={onSelect} />
      </ApiText>
      ;
      <ApiInput
        id="openai"
        type="password"
        placeholder="OpenAI API"
        value={openAiApi}
        onChange={(e) => setOpenAiApi(e.target.value)}
        required
      />
      <SubmitButton type="submit">Save</SubmitButton>
    </ExistContainer>
  );
};

export default SubmitChatGptApi;
