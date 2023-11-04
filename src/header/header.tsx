import logo from "./logo.png";
import { Logo, HeaderClass, ToggleContainer } from "./headerStyles";
import SwitchToggle from "./modeSwitch";

function Header() {
  return (
    <HeaderClass>
      <p>Irregular Trading Terminal </p>
      <Logo src={logo} />
      <ToggleContainer>
        <span>Auto Mode:</span>
        <SwitchToggle />
      </ToggleContainer>
    </HeaderClass>
  );
}

export default Header;
