import {
  LoginContainer,
  ImageLogin,
  Button,
  Input,
  LoginFormStyled,
  TextHeader,
  ErrorStyle,
} from "./loginStyle";
import wassie from "../loginPage/wassie-removebg-preview.png";
import React, { useState } from "react";
import { useHandleLogin } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const Login: React.FC<{
  setIsAuthenticated: (auth: boolean) => void;
}> = ({ setIsAuthenticated }) => {
  return (
    <>
      <LoginContainer>
        <LoginFormComponent setIsAuthenticated={setIsAuthenticated} />
        <ImageLogin src={wassie} alt="Wassie" />
      </LoginContainer>
    </>
  );
};

const LoginFormComponent: React.FC<{
  setIsAuthenticated: (auth: boolean) => void;
}> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const useLogin = async () => {
    const { token, message: errorMessage } = await useHandleLogin(
      username,
      password,
      setIsAuthenticated
    );
    if (errorMessage) {
      setError(errorMessage);
    } else {
      console.log("token: ", token);
      navigate("/");
    }
  };

  return (
    <>
      <LoginFormStyled>
        <TextHeader>Irregular Trading Terminal</TextHeader>
        {error && <ErrorStyle>{error}</ErrorStyle>}
        <Input
          id="username"
          type="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={useLogin}>Login</Button>
      </LoginFormStyled>
    </>
  );
};

export default Login;
