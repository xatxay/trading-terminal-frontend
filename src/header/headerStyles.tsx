import styled from "@emotion/styled/macro";
import { gray, textGray } from "./color";

const Logo = styled.img({
  height: "10vmin",
  pointerEvents: "none",
});

const HeaderClass = styled.header({
  backgroundColor: gray,
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "space-between",
  fontSize: "calc(5px + 2vmin)",
  color: textGray,
  padding: "0 20px",
});

const ToggleContainer = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export { Logo, HeaderClass, ToggleContainer };
