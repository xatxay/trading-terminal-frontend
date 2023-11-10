import { useCallback, useEffect, useState } from "react";
import { DataStatus } from "../utils/interface";

const useWebSocket = (url: string): DataStatus => {
  const [data, setData] = useState<string>("");
  const [status, setStatus] = useState<"connected" | "disconnected">(
    "disconnected"
  );

  const handleMessage = useCallback((event: MessageEvent) => {
    const { data } = event;
    setData(data);
  }, []);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setStatus("connected");
      console.log("Websocket Connected");
    };

    ws.onmessage = handleMessage;

    ws.onclose = () => {
      setStatus("disconnected");
      console.log("Websocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("Websocket error: ", error);
    };

    return () => {
      ws.close();
    };
  }, [url, handleMessage]);

  return { data, status };
};

export default useWebSocket;
