import React from "react";
import { handleClick } from "../utils/utils";
import { Button, HeaderClass, ToggleContainer } from "./headerStyles";
import SwitchToggle from "./modeSwitch";

const Header: React.FC<{ addLogMessage: (message: string) => void }> = ({
  addLogMessage,
}) => {
  return (
    <HeaderClass>
      <p>Irregular Trading Terminal </p>
      <Button
        primary
        onClick={async () => await handleClick("/start", addLogMessage)}
      >
        Start
      </Button>
      <Button onClick={async () => await handleClick("/stop", addLogMessage)}>
        Stop
      </Button>
      <ToggleContainer>
        <span>Manual Mode:</span>
        <SwitchToggle />
      </ToggleContainer>
    </HeaderClass>
  );
};

export default Header;
