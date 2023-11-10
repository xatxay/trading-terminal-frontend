import AccountSummary from "../accountSummary/accountSummary";
import { NewsHeadline } from "../news/news";
import { TradeTable } from "../openPosition/openPosition";
import {
  LeftContainer,
  RightContainer,
  TopRightContainer,
  BottomRightContainer,
  Container,
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
        <BottomRightContainer>
          <AccountSummary />
        </BottomRightContainer>
      </RightContainer>
    </Container>
  );
}

export default Body;
