import React, { useEffect, useRef } from "react";
import LogContainer from "./logTerminalButton";

const TerminalLog: React.FC<{ messages: string[] }> = ({ messages }) => {
  const logAutoScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logAutoScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <LogContainer>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
      <div ref={logAutoScroll} />
    </LogContainer>
  );
};

export default TerminalLog;
