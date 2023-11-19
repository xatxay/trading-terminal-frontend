import {
  LoginContainer,
  ImageLogin,
  Button,
  Input,
  LoginFormStyled,
  TextHeader,
} from "./loginStyle";
import wassie from "../loginPage/wassie-removebg-preview.png";

const Login = () => {
  return (
    <>
      <LoginContainer>
        <LoginFormComponent />
        <ImageLogin src={wassie} alt="Wassie" />
      </LoginContainer>
    </>
  );
};

const LoginFormComponent = () => {
  return (
    <>
      <LoginFormStyled>
        <TextHeader>Irregular Trading Terminal</TextHeader>
        <Input id="username" type="username" placeholder="Username" />
        <Input id="password" type="password" placeholder="Password" />
        <Button onClick={() => alert("Clicked")}>Login</Button>
      </LoginFormStyled>
    </>
  );
};

export default Login;
