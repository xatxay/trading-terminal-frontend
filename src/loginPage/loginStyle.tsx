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
  align-items: flex-start;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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

const TextHeader = styled.h1<{ center?: boolean }>`
  color: white;
  text-align: center;
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

const CreateAccountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const CreateAccount = styled.span`
  color: white;
  text-decoration: underline;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
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
  CreateAccountContainer,
  CreateAccount,
  Header,
};
