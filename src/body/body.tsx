import AccountSummary from "../accountSummary/accountSummary";
import "../body/bodyStyle.css";
import React from "react";
import { ContainerProp } from "../utils/interface";
import NewsHeadline from "../news/news";
import { TradeTable } from "../openPosition/openPosition";

function LeftContainer({ children }: ContainerProp) {
  return <div className="left-container">{children}</div>;
}

function RightContainer({ children }: ContainerProp) {
  return <div className="right-container">{children}</div>;
}

function BottomRight() {
  return (
    <div className="bottom-right-container">
      <AccountSummary />
    </div>
  );
}

function TopRight({ children }: any) {
  return <div className="top-right-container"> {children}</div>;
}

function Body({ children }: any) {
  return (
    <div className="container">
      <LeftContainer>
        <NewsHeadline />
      </LeftContainer>
      <RightContainer>
        <TopRight>
          <TradeTable />
        </TopRight>
        <BottomRight />
      </RightContainer>
    </div>
  );
}

export default Body;
