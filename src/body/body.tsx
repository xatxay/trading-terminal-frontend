import AccountSummary from "../accountSummary/accountSummary";
import LogContainer from "../logTerminal/logTerminalButton";
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

function Body() {
  return (
    <Container>
      <LeftContainer>
        <NewsHeadline />
      </LeftContainer>
      <RightContainer>
        <TopRightContainer>
          <TradeTable />
        </TopRightContainer>
        <MiddleRightContainer>
          <LogContainer />
        </MiddleRightContainer>
        <BottomRightContainer>
          <AccountSummary />
        </BottomRightContainer>
      </RightContainer>
    </Container>
  );
}

export default Body;
