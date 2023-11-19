import styled from "@emotion/styled/macro";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #282c34;
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

const LoginFormStyled = styled.div`
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
  color: #282c34;
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
    color: #282c34;
    font-size: 20px;
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
};
