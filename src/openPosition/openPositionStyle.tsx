import styled from "@emotion/styled/macro";

const Table = styled.div`
  color: #cccccc84;
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

const Cell = styled.div<{ width: number; color?: string; primary?: boolean }>`
  flex: ${(props) => props.width};
  text-align: center;
  color: ${(props) => props.color || "inherit"};
  font-weight: ${(props) => (props.primary ? "bold" : "normal")};
`;

const Button = styled.button`
  background-color: #cccccc84;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #ffae42;
  }
`;

export { Table, Row, Cell, Button };
