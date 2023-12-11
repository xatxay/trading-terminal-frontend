import {
  LoginContainer,
  ImageLogin,
  Button,
  Input,
  LoginFormStyled,
  TextHeader,
  ErrorStyle,
  CreateAccountContainer,
  CreateAccount,
  Header,
  MotionDiv,
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
        <MotionDiv
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <LoginFormComponent setIsAuthenticated={setIsAuthenticated} />
          <ImageLogin src={wassie} alt="Wassie" />
        </MotionDiv>
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

  const useLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const { message: errorMessage } = await useHandleLogin(
      username,
      password,
      setIsAuthenticated
    );
    if (errorMessage) {
      setError(errorMessage);
    } else {
      navigate("/");
    }
  };

  const redirectToRegister = (): void => {
    navigate("/register");
  };

  return (
    <>
      <LoginFormStyled onSubmit={useLogin}>
        <Header>
          <TextHeader>Irregular Trading Terminal</TextHeader>
        </Header>
        {error && (
          <Header>
            <ErrorStyle>{error}</ErrorStyle>
          </Header>
        )}
        <Input
          id="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <CreateAccountContainer>
          <Button type="submit">
            <span>Login</span>
          </Button>
          <CreateAccount onClick={redirectToRegister}>
            Create an account
          </CreateAccount>
        </CreateAccountContainer>
      </LoginFormStyled>
    </>
  );
};

export default Login;
