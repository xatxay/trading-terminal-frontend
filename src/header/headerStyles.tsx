import styled from "@emotion/styled/macro";
import { buttonGreen, buttonRed, textGray } from "./color";
import { ButtonProps } from "../utils/interface";

const Logo = styled.img({
  height: "10vmin",
  pointerEvents: "none",
});

const HeaderClass = styled.header({
  backgroundColor: "black",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "space-between",
  fontSize: "20px",
  color: textGray,
  padding: "0 20px",
});

const ToggleContainer = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "15px",
});

const Button = styled.button<ButtonProps>`
  padding: 13px 50px;
  border: 0;
  lineheight: 1;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: white;
  }
  background: ${(props) => (props.primary ? buttonGreen : buttonRed)};
`;

export { Logo, HeaderClass, ToggleContainer, Button };
