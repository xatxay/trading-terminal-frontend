import { formatDate, useExtractData } from "../utils/utils";
import React from "react";
import {
  ButtonContainer,
  ButtonSize,
  HeaderContainer,
  ImageContainer,
  NewsBody,
  NewsContainer,
  NewsHeadlineStyle,
  NewsImage,
  NewsText,
  NewsVideo,
  Time,
} from "./newsStyle";

const NewsButtons: React.FC<{ coin: string }> = ({ coin }) => {
  console.log("coins: ", coin);
  return (
    <ButtonContainer>
      <ButtonSize>75%</ButtonSize>
      <ButtonSize>25%</ButtonSize>
      <ButtonSize primary>{coin}</ButtonSize>
      <ButtonSize primary>25%</ButtonSize>
      <ButtonSize primary>75%</ButtonSize>
    </ButtonContainer>
  );
};

function NewsHeadline() {
  const messages = useExtractData();

  return (
    <div>
      {messages.map((message) => (
        <NewsContainer key={message._id}>
          <HeaderContainer>
            <NewsHeadlineStyle>{message.title}</NewsHeadlineStyle>
            <Time>{formatDate(message.time)}</Time>
          </HeaderContainer>
          <NewsText>
            <NewsBody
              as="a"
              href={message.link ? message.link : message.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {message.newsHeadline}
            </NewsBody>
          </NewsText>
          <ImageContainer>
            {message.video ? (
              <NewsVideo controls src={message.video} />
            ) : message.image ? (
              <NewsImage src={message.image} alt="News" />
            ) : null}
          </ImageContainer>
          {message.suggestions && message.suggestions.length > 0 ? (
            message.suggestions.map((sugguest) => (
              <NewsButtons key={sugguest} coin={sugguest || "N/A"} />
            ))
          ) : (
            <NewsButtons coin="N/A" />
          )}
        </NewsContainer>
      ))}
    </div>
  );
}

export { NewsHeadline };
