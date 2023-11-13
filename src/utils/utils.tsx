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
    const intervalId = setInterval(fetchData, 10000000);

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

const useExtractData = (): NewsData[] => {
  const { data, status } = useWebSocket("wss://news.treeofalpha.com/ws");
  const [messages, setMessages] = useState<NewsData[]>([]);

  useEffect(() => {
    if (data) {
      const parseData = JSON.parse(data);

      const newsData: NewsData = {
        title: "",
        newsHeadline: "",
        suggestions: [],
        url: "",
        link: "",
        image: "",
        video: "",
        time: 0,
        _id: "",
      };

      if (!parseData) return;
      if (parseData.source) {
        const blogTitle = parseData.title.match(/^([A-Z\s\\.\\-]+:)/) || [];
        newsData.title = blogTitle[0] ? blogTitle[0].trim() : "";
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
      newsData.suggestions = parseData.suggestions
        ? parseData.suggestions.map((coin: { coin: string }) => coin.coin)
        : [];
      newsData.time = parseData.time;
      newsData._id = parseData._id;

      setMessages((prevMessage) => {
        const newMessages = [newsData, ...prevMessage];
        if (newMessages.length > 15) {
          newMessages.pop();
        }
        return newMessages;
      });

      console.log("staus: ", status);
      console.log("socket: ", parseData);
    }
  }, [data, status]);
  return messages;
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

const useGetPrice = () => {
  const { data, status } = useWebSocket("ws://localhost:8080");
  // const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (!data) return;
    const parseData = JSON.parse(data);
    console.log("price: ", parseData);
    console.log("status: ", status);
  }, [data, status]);
};

const handleClick = async (
  endpoint: string,
  addLogMessage: (message: string) => void,
  side?: string,
  symbol?: string
) => {
  try {
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ side, symbol }),
    });
    const data = await response.json();
    addLogMessage(data.message);
    console.log(data.message);
  } catch (err) {
    console.error("Error: ", err);
    addLogMessage(`Error: ${err}`);
  }
};

export {
  useFetch,
  useGetPosition,
  useExtractData,
  formatDate,
  useGetPrice,
  handleClick,
};
