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
  return (
    <Row>
      <Cell width={1}>{trade.side}</Cell>
      <Cell width={1}>{trade.symbol}</Cell>
      <Cell width={1}>{trade.leverage}</Cell>
      <Cell width={1}>{tradeFormat.positionSize}</Cell>
      <Cell width={1}>{tradeFormat.entry}</Cell>
      <Cell width={1}>{tradeFormat.marketPrice}</Cell>
      <Cell width={1}>x{tradeFormat.liqPrice}</Cell>
      <Cell width={1}>{tradeFormat.uPnl}</Cell>
      <Cell width={1}>{tradeFormat.realizedPnl}</Cell>
      <Cell width={1}>
        <Button>Close</Button>
      </Cell>
    </Row>
  );
};

export { TradeTable };
