import React from "react";
import { handleClick, handleLogout } from "../utils/utils";
import { Button, HeaderClass, ToggleContainer } from "./headerStyles";
// import SwitchToggle from "./modeSwitch";
import { useNavigate } from "react-router-dom";
import APIModal from "../apiInput/apiInputModal";
import PositionSizeSubmit from "../positionSize/positionSize";
// import Logout from "../logout/logoutStyle";

const Header: React.FC<{
  addLogMessage: (message: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
}> = ({ addLogMessage, setIsAuthenticated, navigate }) => {
  return (
    <HeaderClass>
      <p>Irregular Trading Terminal </p>
      <Button
        primary
        onClick={async () =>
          await handleClick("/start", addLogMessage, navigate)
        }
      >
        Start
      </Button>
      <Button
        onClick={async () =>
          await handleClick("/stop", addLogMessage, navigate)
        }
      >
        Stop
      </Button>
      <ToggleContainer>
        <PositionSizeSubmit />
        <APIModal />
        <Button onClick={() => handleLogout(setIsAuthenticated, navigate)}>
          Logout
        </Button>
      </ToggleContainer>
    </HeaderClass>
  );
};

export default Header;
