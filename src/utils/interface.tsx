import React from "react";

export interface AccountSummaryInterface {
  totalEquity: number;
  totalMarginBalance: number;
  totalAvailableBalance: number;
  totalPerpUPL: number;
}

export interface ButtonProps {
  primary?: boolean;
}

export interface ContainerProp {
  children?: React.ReactNode;
}

export interface Positions {
  symbol: string;
  leverage: string;
  avgPrice: string;
  liqPrice: string;
  positionValue: string;
  unrealisedPnl: string;
  markPrice: string;
  cumRealisedPnl: string;
  side: string;
}
