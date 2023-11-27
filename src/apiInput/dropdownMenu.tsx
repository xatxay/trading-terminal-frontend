import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { DropdownBox, DropdownItems, MenuButton } from "./dropdownMenuStyle";

const DropdownMenu: React.FC = () => {
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
              <MenuButton>
                <li>
                  <a href="#bybit-api">Bybit API</a>
                </li>
              </MenuButton>
              <MenuButton>
                <li>
                  <a href="#openai-api">OpenAI API</a>
                </li>
              </MenuButton>
            </ul>
          </DropdownBox>
        </DropdownItems>
      )}
    </div>
  );
};

export default DropdownMenu;
