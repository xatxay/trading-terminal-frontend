import styled from "@emotion/styled/macro";

const Table = styled.div`
  background-color: white;
  color: black;
  padding: auto;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #045fc8;
  &:last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div<{ width: number }>`
  flex: ${(props) => props.width};
  text-align: center;
`;

const Button = styled.button`
  background-color: bisque;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: aquamarine;
  }
`;

export { Table, Row, Cell, Button };
