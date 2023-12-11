import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { darkGray, orange } from "../header/color";

const Table = styled.div`
  color: ${darkGray};
  padding: auto;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgb(221, 211, 211);
  &:last-child {
    border-bottom: none;
  }
`;

const closeAllStlye = css`
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${orange};
  }
`;

const Cell = styled.div<{
  width: number;
  color?: string;
  primary?: boolean;
  onClick?: () => void;
}>`
  flex: ${(props) => props.width};
  text-align: center;
  overflow: hidden;
  padding: 0 10px;
  color: ${(props) => props.color || "inherit"};
  font-weight: ${(props) => (props.primary ? "bold" : "normal")};
  ${(props) => props.onClick && closeAllStlye}
`;

const Button = styled.button`
  background-color: ${darkGray};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: ${orange};
    transform: scaleX(0);
    transform-origin: left center;
    transition: 0.5s ease;
    z-index: 0;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

export { Table, Row, Cell, Button };
