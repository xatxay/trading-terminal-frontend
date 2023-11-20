import styled from "@emotion/styled/macro";
import { darkGray } from "../header/color";

const AccountSummaryStyle = styled.div`
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 1.5em;
    margin-top: 5px;
  }
`;

const LabelColor = styled.span`
  color: ${darkGray};
`;
const ValueColor = styled.span`
  font-weight: bold;
  color: white;
  margin-left: auto;
`;

export { AccountSummaryStyle, LabelColor, ValueColor };
