import { css } from "@emotion/react";
import { backgroundGray } from "../header/color";

const globalScrollbarStyle = css`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${backgroundGray};
  }

  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 6px;
    &:hover {
      background-color: #444;
    }
  }
`;

export default globalScrollbarStyle;
