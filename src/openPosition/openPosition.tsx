import React, { useEffect } from "react";
import { Button, Cell, Row, Table } from "./openPositionStyle";
import { handleClick, useFetch } from "../utils/utils";
import { Positions } from "../utils/interface";
import { useNavigate } from "react-router-dom";
import { useApiKeys } from "../apiContext/apiContext";
import { ErrorStyle } from "../loginPage/loginStyle";
import chopper from "../loginPage/chopper.png";
import "./chopper.css";

const TradeTable: React.FC<{
  addLogMessage: (message: string) => void;
}> = ({ addLogMessage }) => {
  const { data, error, refetch } = useFetch<Positions[]>(
    String(process.env.REACT_APP_POSITION),
    1000
  );
  const { bybitApi } = useApiKeys();
  console.log("position: ", data);

  useEffect(() => {
    refetch();
  }, [refetch, bybitApi]);

  if (!data || !Array.isArray(data))
    return (
      <div className="chopperPos">
        <img src={chopper} alt="chopper" className="chopper" />
      </div>
    );

  if (error) return <ErrorStyle>{error}</ErrorStyle>;

  const positions =
    data?.map(
      ({
        symbol,
        leverage,
        avgPrice,
        stopLoss,
        positionValue,
        unrealisedPnl,
        markPrice,
        side,
      }) => ({
        symbol,
        leverage,
        avgPrice,
        stopLoss,
        positionValue,
        unrealisedPnl,
        markPrice,
        side,
      })
    ) ?? []; //destructure only the value needed
  return (
    <Table>
      <TradeRowHeader addLogMessage={addLogMessage} />
      {positions.map((pos) => {
        return (
          <TradeRow
            key={pos.symbol}
            trade={pos}
            addLogMessage={addLogMessage}
          />
        );
      })}
    </Table>
  );
};

const TradeRow: React.FC<{
  trade: Positions;
  addLogMessage: (message: string) => void;
}> = ({ trade, addLogMessage }) => {
  const tradeFormat = {
    positionSize: Number(trade.positionValue).toFixed(2),
    entry: Number(trade.avgPrice).toFixed(3),
    marketPrice: Number(trade.markPrice).toFixed(3),
    stopLoss: Number(trade.stopLoss).toFixed(3),
    uPnl: Number(trade.unrealisedPnl).toFixed(2),
  };
  const sideColor = trade.side === "Buy" ? "green" : "red";
  const uPnlColor = Number(trade.unrealisedPnl) > 0 ? "green" : "red";
  const textColor = "white";
  const navigate = useNavigate();
  return (
    <Row>
      <Cell width={1} color={sideColor}>
        {trade.symbol}
      </Cell>
      <Cell width={1} color={textColor}>
        {trade.leverage}X
      </Cell>
      <Cell width={1} color={textColor}>
        {tradeFormat.positionSize}
      </Cell>
      <Cell width={1} color={textColor}>
        {tradeFormat.entry}
      </Cell>
      <Cell width={1} color={textColor}>
        {tradeFormat.marketPrice}
      </Cell>
      <Cell width={1} color={textColor}>
        {tradeFormat.stopLoss}
      </Cell>
      <Cell width={1} color={uPnlColor}>
        {tradeFormat.uPnl}
      </Cell>
      <Cell width={1}>
        <Button
          onClick={async () =>
            handleClick(
              "/close",
              addLogMessage,
              navigate,
              trade.side,
              trade.symbol
            )
          }
        >
          Close
        </Button>
      </Cell>
    </Row>
  );
};

const TradeRowHeader: React.FC<{
  addLogMessage: (message: string) => void;
}> = ({ addLogMessage }) => {
  const navigate = useNavigate();
  return (
    <Row>
      <Cell width={1} primary>
        Ticker
      </Cell>
      <Cell width={1} primary>
        Leverage
      </Cell>
      <Cell width={1} primary>
        Size
      </Cell>
      <Cell width={1} primary>
        Entry
      </Cell>
      <Cell width={1} primary>
        Price
      </Cell>
      <Cell width={1} primary>
        SL
      </Cell>
      <Cell width={1} primary>
        PNL
      </Cell>
      <Cell
        width={1}
        primary
        onClick={async () =>
          await handleClick("/closeAll", addLogMessage, navigate)
        }
      >
        Close All
      </Cell>
    </Row>
  );
};

export { TradeTable };
