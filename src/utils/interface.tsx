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

export interface TerminalLog {
  type: string;
  message: string;
  timeStamp: string;
}

export interface Positions {
  symbol: string;
  leverage: string;
  avgPrice: string;
  stopLoss: string;
  positionValue: string;
  unrealisedPnl: string;
  markPrice: string;
  side: string;
}

interface Info {
  twitterId: number;
  isReply: boolean;
  isRetweet: boolean;
  isQuote: boolean;
}

export interface MessageWebsocket {
  data: string;
  title?: string;
  body?: string;
  icon?: string;
  image?: string;
  requireInteraction?: boolean;
  type?: string;
  link?: string;
  info?: Info;
  video?: string;
  suggestions?: string[];
  time?: number;
  _id?: string;
  source?: string;
  url?: string;
  symbols?: string[];
}

export interface NewsData {
  title: string;
  newsHeadline: string;
  url?: string;
  link: string;
  time: number;
  suggestions: string[];
  image?: string;
  video?: string;
  _id: string;
  source?: string;
  body?: string;
}

export interface Suggestion {
  coin?: string;
}

export interface DataStatus {
  data: string;
  status: string;
}

export interface PriceData {
  ticker: string;
  percentage: number;
  price: string;
}

export interface BackendData {
  message?: string;
  token?: string;
}

export interface RequestOptions {
  method: "GET" | "POST";
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body?: string;
}

export interface ApiData {
  apiKey?: string;
  apiSecret?: string;
}

export interface BybitApiContextType {
  bybitApi: ApiData;
  updateApiKeys: (newKeys: ApiData) => void;
}

export interface SelectDropdown {
  closeModal?: () => void;
  onSelect: (api: "bybit" | "openai" | "") => void;
}

export interface ExistModal extends SelectDropdown {
  isEditting: boolean;
  isEdittingOpenAi: boolean;
  toggleIsEditting: () => void;
  toggleIsEdittingOpenAi: () => void;
}
