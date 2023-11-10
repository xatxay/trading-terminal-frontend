import AccountSummary from "../accountSummary/accountSummary";
import { NewsHeadlineWithImg, NewsHeadlineNoImg } from "../news/news";
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
        <NewsHeadlineWithImg />
        <NewsHeadlineNoImg />
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
