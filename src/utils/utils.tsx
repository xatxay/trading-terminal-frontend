import { useEffect, useState } from "react";
import { BackendData, NewsData, Positions, PriceData } from "./interface";
import useWebSocket from "../newsHeadline/newsWebsocket";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useFetch = <T,>(
  url: string,
  intervalMs: number | null = null
): { data: T | null; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timer | null = null;
    const token = localStorage.getItem("token");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, requestOptions);
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
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
    if (intervalMs) {
      intervalId = setInterval(fetchData, intervalMs);
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [url, intervalMs, navigate]);
  return { data, error };
};

const useGetPosition = () => {
  return useFetch<Positions[]>(
    String(process.env.REACT_APP_POSITION),
    100000000
  );
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

const formatDate = (timeMs?: number): string => {
  const time = timeMs ? new Date(timeMs) : new Date(),
    hours = time.getHours().toString().padStart(2, "0"),
    minutes = time.getMinutes().toString().padStart(2, "0"),
    seconds = time.getSeconds().toString().padStart(2, "0"),
    milliseconds = time.getMilliseconds().toString().padStart(3, "0"),
    timeFormatted = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  return timeFormatted;
};

const useGetPrice = (): PriceData => {
  const { data, status } = useWebSocket(String(process.env.REACT_APP_WS));
  const [tickerPercentage, setTickerPercentage] = useState<PriceData>({
    ticker: "",
    percentage: 0,
  });

  useEffect(() => {
    if (!data) return;
    const parseData = JSON.parse(data);
    console.log("price: ", parseData);
    // console.log("status: ", status);
    setTickerPercentage(parseData);
  }, [data, status]);

  return tickerPercentage;
};

const handleClick = async (
  endpoint: string,
  addLogMessage: (message: string) => void,
  navigate: ReturnType<typeof useNavigate>,
  side?: string,
  symbol?: string,
  percentage?: string
) => {
  console.log("sss: ", side, symbol, endpoint, percentage);
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${String(process.env.REACT_APP_URL)}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ side, symbol, percentage }),
      }
    );
    if (response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    const data = await response.json();
    addLogMessage(data.message);
    console.log(data.message);
  } catch (err) {
    console.error("Error: ", err);
    addLogMessage(`Error: ${err}`);
  }
};

const useHandleLogin = async (
  email: string,
  password: string,
  setIsAuthenticated: (isAuthenticated: boolean) => void
): Promise<BackendData> => {
  try {
    console.log(email, password);
    const response = await fetch(String(process.env.REACT_APP_LOGIN), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log("loginResponse: ", response);

    if (!response.ok) {
      const errorMessage: BackendData = await response.json();
      console.error("Login Failed: ", errorMessage.message);
      return { token: "", message: errorMessage.message || "Login failed" };
    }

    setIsAuthenticated(true);
    const { token } = await response.json();
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);

    return { token, message: "" };
  } catch (err) {
    console.error("failed logging in", err);
    return { token: "", message: "Login request failed" };
  }
};

const handleBybitApi = async (
  email: string,
  apiKey: string,
  apiSecret: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(String(process.env.REACT_APP_USERAPI), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, apiKey, apiSecret }),
    });
    return response;
  } catch (err) {
    console.log("Error submitting bybit api: ", err);
  }
};

const handleOpenAiApi = async (email: string, openAiApi: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      String(process.env.REACT_APP_USER_OPENAI_API),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, openAiApi }),
      }
    );
    return response;
  } catch (err) {
    console.error("Error submitting openai api: ", err);
  }
};

const useHandleRegister = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await fetch(String(process.env.REACT_APP_REGISTER), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response;
  } catch (err) {
    console.error("Failed creating an account: ", err);
  }
};

const handleLogout = (
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  navigate: ReturnType<typeof useNavigate>
): void => {
  console.log("logging out");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  setIsAuthenticated(false);
  navigate("/login");
};

const useAutoLogout = (
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  navigate: ReturnType<typeof useNavigate>
): void => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now();
      if (decodedToken.exp && decodedToken.exp * 1000 < currentTime) {
        handleLogout(setIsAuthenticated, navigate);
      } else {
        const logoutTimer = decodedToken.exp
          ? decodedToken.exp * 1000 - currentTime
          : null;
        if (logoutTimer)
          setTimeout(
            () => handleLogout(setIsAuthenticated, navigate),
            logoutTimer
          );
      }
    }
  }, [navigate, setIsAuthenticated]);
};

const checkSubmittedApi = async (
  email: string,
  endpoint: string
): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(String(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error("Please enter your api key in the settings");
    }
    const data = await response.json();
    console.log("checkapi: ", response);
    return data;
  } catch (err) {
    console.log("Failed checking user submitted API: ", err);
  }
};

export {
  useFetch,
  useGetPosition,
  useExtractData,
  formatDate,
  useGetPrice,
  handleClick,
  useHandleLogin,
  useAutoLogout,
  handleLogout,
  useHandleRegister,
  handleBybitApi,
  checkSubmittedApi,
  handleOpenAiApi,
};
