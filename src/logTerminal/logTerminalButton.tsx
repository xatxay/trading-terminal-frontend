import styled from "@emotion/styled/macro";

const LogContainer = styled.div`
  background-color: black;
  color: white;
  font-family: "Courier New", monospace;
  padding: 10px;
  height: 150px;
  overflow-y: auto;
  white-space: pre-wrap;
  border-radius: 10px;
  &::-webkit-scrollbar {
    display: none; //hide scrollbar for webkit browser
  }
  //hide scrollbar for ie, edge, firefox
  -ms-overflow-style: none; //ie 10+
  scrollbar-width: none; //firefox
  //scrollable for older firefox
  overflow: -moz-scrollbars-none;
`;

export default LogContainer;
