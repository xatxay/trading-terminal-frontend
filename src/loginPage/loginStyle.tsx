import styled from "@emotion/styled/macro";
import { backgroundGray } from "../header/color";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${backgroundGray};
  justify-content: space-evenly;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ImageLogin = styled.img`
  max-height: 400px;
  max-weight: 400px;
`;

const LoginFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  height: 75px;
  width: 200px;
  border: none;
  border-radius: 35px;
  background-color: gray;
  color: ${backgroundGray};
  cursor: pointer;
  font-size: 25px;
  &:hover {
    background-color: white;
  }
`;

const TextHeader = styled.h1`
  color: white;
`;

const Input = styled.input`
  height: 60px;
  width: 400px;
  padding: 0 20px;
  margin-bottom: 30px;
  background-color: gray;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 20px;
  ::-webkit-input-placeholder {
    color: ${backgroundGray};
    font-size: 20px;
  }
`;

const ErrorStyle = styled.div`
  display: flex;
  text-aligns: start;
  color: red;
  margin-bottom: 30px;
`;

export {
  LoginContainer,
  ImageLogin,
  Button,
  Input,
  LoginFormStyled,
  LeftContainer,
  RightContainer,
  TextHeader,
  ErrorStyle,
};
