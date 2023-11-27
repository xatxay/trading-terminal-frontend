import { ApiInput, ApiText, SubmitButton } from "./apiInputStyle";
// import DropdownMenu from "./dropdownMenu";

const SubmitChatGptApi = () => {
  return (
    <>
      <ApiText chatgpt>Enter Your OpenAI API</ApiText>
      ;
      <ApiInput id="openai" type="password" placeholder="OpenAI API" />
      <SubmitButton>Save</SubmitButton>
    </>
  );
};

export default SubmitChatGptApi;
