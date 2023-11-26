import styled from "@emotion/styled/macro";
import { backgroundGray } from "../header/color";

const ApiInput = styled.input`
  padding: 15px;
  background-color: gray;
  border: none;
  border-radius: 5px;
  margin-bottom: 30px;
  ::-webkit-input-placeholder {
    color: ${backgroundGray};
    font-weight: bold;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 30px;
  background-color: gray;
  color: ${backgroundGray};
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  &:hover {
    background-color: white;
  }
`;

const ApiText = styled.h3`
  color: white;
  margin-bottom: 30px;
`;

export { ApiInput, ApiText, SubmitButton };
