import { useCallback, useEffect, useState } from "react";
import { MessageWebsocket } from "../utils/interface";

const useWebSocket = (url: string) => {
  const [data, setData] = useState<any>("");
  const [status, setStatus] = useState<"connected" | "disconnected">(
    "disconnected"
  );

  const handleMessage = useCallback((event: MessageWebsocket) => {
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
