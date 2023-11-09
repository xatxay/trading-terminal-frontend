import { Button, HeaderClass, ToggleContainer } from "./headerStyles";
import SwitchToggle from "./modeSwitch";

function Header() {
  return (
    <HeaderClass>
      <p>Irregular Trading Terminal </p>
      <Button primary onClick={() => alert("start")}>
        Start
      </Button>
      <Button onClick={() => alert("stop")}>Stop</Button>
      <ToggleContainer>
        <span>Manual Mode:</span>
        <SwitchToggle />
      </ToggleContainer>
    </HeaderClass>
  );
}

export default Header;
