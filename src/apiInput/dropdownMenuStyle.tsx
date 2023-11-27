import styled from "@emotion/styled/macro";
import { backgroundGray, darkGray } from "../header/color";

const DropdownItems = styled.div`
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const MenuButton = styled.button`
  flex: 1;
  background-color: white;
  color: ${backgroundGray};
  border: none;
  padding: 1rem;
  font-weight: bold;
  &:hover {
    background-color: ${darkGray};
  }
  a {
    color: inherit;
    text-decoration: none;
    display: block;
  }
`;

const DropdownBox = styled.div`
  position: absolute;
  width: 150px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export { DropdownItems, DropdownBox, MenuButton };
