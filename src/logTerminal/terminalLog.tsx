import React, { useEffect, useRef } from "react";
import LogContainer from "./logTerminalButton";

const TerminalLog: React.FC<{ messages: string[] }> = ({ messages }) => {
  const logAutoScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logAutoScroll.current) {
      const { scrollHeight, clientHeight } = logAutoScroll.current;
      logAutoScroll.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  return (
    <LogContainer ref={logAutoScroll}>
      <div>Enter Your Bybit Api Key In The Settings To Start Degening</div>
      <div>Press Start To Use Chatgpt Mode</div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </LogContainer>
  );
};

export default TerminalLog;
