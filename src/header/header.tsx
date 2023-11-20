import React from "react";
import { handleClick, handleLogout } from "../utils/utils";
import { Button, HeaderClass } from "./headerStyles";
// import SwitchToggle from "./modeSwitch";
import { useNavigate } from "react-router-dom";
import Logout from "../logout/logoutStyle";

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
      <Logout onClick={() => handleLogout(setIsAuthenticated, navigate)}>
        Logout
      </Logout>
    </HeaderClass>
  );
};

export default Header;
