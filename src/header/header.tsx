import { handleClick } from "../utils/utils";
import { Button, HeaderClass, ToggleContainer } from "./headerStyles";
import SwitchToggle from "./modeSwitch";

function Header() {
  return (
    <HeaderClass>
      <p>Irregular Trading Terminal </p>
      <Button primary onClick={async () => await handleClick("/start")}>
        Start
      </Button>
      <Button onClick={async () => await handleClick("/stop")}>Stop</Button>
      <ToggleContainer>
        <span>Manual Mode:</span>
        <SwitchToggle />
      </ToggleContainer>
    </HeaderClass>
  );
}

export default Header;
