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
  &:hover {
    background-color: ${orange};
  }
`;

export { Table, Row, Cell, Button };
