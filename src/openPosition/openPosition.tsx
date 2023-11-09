import React from "react";
import { Button, Cell, Row, Table } from "./openPositionStyle";
import { useGetPosition } from "../utils/utils";
import { Positions } from "../utils/interface";

const TradeTable: React.FC<any> = () => {
  const { data, error } = useGetPosition();

  if (error) return <p>Error: {error}</p>;

  const positions =
    data?.map(
      ({
        symbol,
        leverage,
        avgPrice,
        liqPrice,
        positionValue,
        unrealisedPnl,
        markPrice,
        cumRealisedPnl,
        side,
      }) => ({
        symbol,
        leverage,
        avgPrice,
        liqPrice,
        positionValue,
        unrealisedPnl,
        markPrice,
        cumRealisedPnl,
        side,
      })
    ) ?? [];
  console.log("positions: ", positions);
  return (
    <Table>
      <TradeRowHeader />
      {positions.map((pos) => {
        return <TradeRow key={pos.positionValue} trade={pos} />;
      })}
    </Table>
  );
};

const TradeRow: React.FC<{ trade: Positions }> = ({ trade }) => {
  const tradeFormat = {
    positionSize: Number(trade.positionValue).toFixed(2),
    entry: Number(trade.avgPrice).toFixed(2),
    marketPrice: Number(trade.markPrice).toFixed(2),
    liqPrice: Number(trade.liqPrice).toFixed(2),
    uPnl: Number(trade.unrealisedPnl).toFixed(2),
    realizedPnl: Number(trade.cumRealisedPnl).toFixed(2),
  };
  const sideColor = trade.side === "Buy" ? "green" : "red";
  const uPnlColor = Number(trade.unrealisedPnl) > 0 ? "green" : "red";
  const rPnlColor = Number(trade.cumRealisedPnl) > 0 ? "green" : "red";
  const textColor = "white";
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
        {tradeFormat.liqPrice}
      </Cell>
      <Cell width={1} color={uPnlColor}>
        {tradeFormat.uPnl}
      </Cell>
      <Cell width={1} color={rPnlColor}>
        {tradeFormat.realizedPnl}
      </Cell>
      <Cell width={1}>
        <Button>Close</Button>
      </Cell>
    </Row>
  );
};

const TradeRowHeader = () => {
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
        Liq Price
      </Cell>
      <Cell width={1} primary>
        UnPNL
      </Cell>
      <Cell width={1} primary>
        RPNL
      </Cell>
      <Cell width={1} primary>
        Close All
      </Cell>
    </Row>
  );
};

export { TradeTable };
