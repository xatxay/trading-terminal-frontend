import AccountSummary from "../accountSummary/accountSummary";
import "../body/bodyStyle.css";

function TopLeft() {
  return <div className="top-left-selection">section 1</div>;
}

function TopRight() {
  return <div className="top-right-selection">section 2</div>;
}

function BottomLeft() {
  return <div className="bottom-left-selection">section 3</div>;
}

function BottomRight() {
  return (
    <div className="bottom-right-selection">
      <AccountSummary />
    </div>
  );
}

function Body() {
  return (
    <div className="background">
      <div className="top-container">
        <TopLeft />
        <TopRight />
      </div>
      <div className="bottom-container">
        <BottomLeft />
        <BottomRight />
      </div>
    </div>
  );
}

export default Body;
