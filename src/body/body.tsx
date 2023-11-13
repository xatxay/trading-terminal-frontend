import React from "react";
import AccountSummary from "../accountSummary/accountSummary";
import { NewsHeadline } from "../news/news";
import { TradeTable } from "../openPosition/openPosition";
import {
  LeftContainer,
  RightContainer,
  TopRightContainer,
  BottomRightContainer,
  Container,
  MiddleRightContainer,
} from "./bodyStyle";
import TerminalLog from "../logTerminal/terminalLog";

const Body: React.FC<{
  logMessages: string[];
  addLogMessage: (message: string) => void;
}> = ({ logMessages, addLogMessage }) => {
  return (
    <Container>
      <LeftContainer>
        <NewsHeadline />
      </LeftContainer>
      <RightContainer>
        <TopRightContainer>
          <TradeTable addLogMessage={addLogMessage} />
        </TopRightContainer>
        <MiddleRightContainer>
          <TerminalLog messages={logMessages} />
        </MiddleRightContainer>
        <BottomRightContainer>
          <AccountSummary />
        </BottomRightContainer>
      </RightContainer>
    </Container>
    // fix auto scroll
  );
};

export default Body;
