import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { DropdownBox, DropdownItems, MenuButton } from "./dropdownMenuStyle";
import { SelectDropdown } from "../utils/interface";

const DropdownMenu: React.FC<SelectDropdown> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <IoIosArrowDropdown
        className="dropdown"
        style={{ marginLeft: 10, color: isOpen ? "white" : "gray" }}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <DropdownItems>
          <DropdownBox>
            <ul>
              <MenuButton onClick={() => onSelect("bybit")}>
                <li>Bybit API</li>
              </MenuButton>
              <MenuButton onClick={() => onSelect("openai")}>
                <li>OpenAI API</li>
              </MenuButton>
            </ul>
          </DropdownBox>
        </DropdownItems>
      )}
    </div>
  );
};

export default DropdownMenu;
