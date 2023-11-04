import { useState } from "react";
import "./toggle.css";

const SwitchToggle = () => {
  const [isToggled, setIsToggle] = useState(false);

  const handleToggle = () => {
    setIsToggle(!isToggled);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
};

export default SwitchToggle;
