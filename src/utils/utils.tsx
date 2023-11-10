import { useEffect, useState } from "react";
import { NewsData, Positions } from "./interface";
import useWebSocket from "../newsHeadline/newsWebsocket";

const useFetch = <T,>(
  url: string
): { data: T | null; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching: ${response.status}`);
        }
        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 20000000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [url]);
  return { data, error };
};

const useGetPosition = () => {
  return useFetch<Positions[]>("http://localhost:5000/positions");
};

const useExtractData = (): any => {
  const { data, status } = useWebSocket("wss://news.treeofalpha.com/ws");
  let parseData: any = {};
  if (data) parseData = JSON.parse(data);

  const newsData: NewsData = {
    title: "",
    newsHeadline: "",
    suggestion: [],
    url: "",
    link: "",
    image: "",
    video: "",
    time: 0,
  };

  if (parseData) {
    console.log("data: ", parseData.title);

    if (parseData.source) {
      const blogTitle = parseData.title.match(/^([A-Z\s\\.\\-]+:)/) || [];
      newsData.title = blogTitle ? blogTitle[0].trim() : "";
      console.log("BLOGTITLE: ", blogTitle);
      newsData.newsHeadline = newsData.title
        ? parseData.title.substring(newsData.title.length).trim()
        : parseData.title;
      newsData.url = parseData.url;
    } else {
      const twitterTitle = parseData.title
        ? parseData.title.match(/@([A-Za-z0-9_]+)/)
        : "";
      newsData.title = twitterTitle[1];
      console.log("TWITTERTITLE: ", newsData.title);
      newsData.newsHeadline = parseData.body;
      newsData.link = parseData.link;
    }
    newsData.image = parseData.image ? parseData.image : "";
    newsData.video = parseData.video ? parseData.video : "";
    newsData.suggestion = parseData.suggestions
      ? parseData.suggestions.map((coin: { coin: string }) => coin.coin)
      : [];
    newsData.time = parseData.time;

    console.log("socket: ", parseData, "status: ", status);
    return newsData;
  }
};

const formatDate = (timeMs: number): string => {
  const time = new Date(timeMs),
    hours = time.getHours().toString().padStart(2, "0"),
    minutes = time.getMinutes().toString().padStart(2, "0"),
    seconds = time.getSeconds().toString().padStart(2, "0"),
    milliseconds = time.getMilliseconds().toString().padStart(2, "0"),
    timeFormatted = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  return timeFormatted;
};

export { useFetch, useGetPosition, useExtractData, formatDate };
