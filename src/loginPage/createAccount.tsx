import { useState } from "react";
import React from "react";
import wassie from "./wassie-removebg-preview.png";
import {
  Button,
  CreateAccount,
  CreateAccountContainer,
  ErrorStyle,
  Header,
  ImageLogin,
  Input,
  LoginContainer,
  LoginFormStyled,
  TextHeader,
} from "./loginStyle";
import { useNavigate } from "react-router-dom";
import { useHandleRegister } from "../utils/utils";
import { toast } from "react-toastify";

const Register = () => {
  return (
    <LoginContainer>
      <CreateAccountForm />
      <ImageLogin src={wassie} alt="Wassie" />
    </LoginContainer>
  );
};

const CreateAccountForm: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const useRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await useHandleRegister(email, password);
    console.log("register: ", response);
    if (response.ok) {
      toast.success("Account Created! Please Login");
      navigate("/login");
      setError("");
    } else {
      const error = await response.json();
      setError(error.message || "Failed creating an account");
      toast.error(`Failed creating an account: ${error.message}`);
      console.log("error message: ", error.message);
    }
    console.log("register: ", response);
  };

  const redirectToLogin = (): void => {
    navigate("/login");
  };

  return (
    <>
      <LoginFormStyled onSubmit={useRegister}>
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <CreateAccountContainer>
          <Button type="submit">
            <span>Register</span>
          </Button>
          <CreateAccount onClick={redirectToLogin}>Login</CreateAccount>
        </CreateAccountContainer>
      </LoginFormStyled>
    </>
  );
};

export default Register;
