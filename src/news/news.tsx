import { formatDate, useExtractData, useGetPrice } from "../utils/utils";
import React, { useEffect, useState } from "react";
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
  Percentage,
  Time,
} from "./newsStyle";

const NewsButtons: React.FC<{ coin: string; percentage?: number }> = ({
  coin,
  percentage,
}) => {
  console.log("coins: ", coin);
  return (
    <ButtonContainer>
      <ButtonSize>75%</ButtonSize>
      <ButtonSize>25%</ButtonSize>
      <ButtonSize primary>
        {coin}{" "}
        {percentage !== undefined && (
          <Percentage positive={percentage > 0}>{percentage}%</Percentage>
        )}
      </ButtonSize>
      <ButtonSize primary>25%</ButtonSize>
      <ButtonSize primary>75%</ButtonSize>
    </ButtonContainer>
  );
};

function NewsHeadline() {
  const messages = useExtractData();
  const { ticker, percentage } = useGetPrice();
  const [tickerPercentage, setTickerPercentage] = useState<{
    [key: string]: number;
  }>({});
  console.log("tickerPercentage: ", ticker, "|", percentage);

  useEffect(() => {
    setTickerPercentage((prev) => ({ ...prev, [ticker]: percentage }));
  }, [ticker, percentage]);

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
              <NewsButtons
                key={sugguest}
                coin={sugguest || "N/A"}
                percentage={tickerPercentage[sugguest]}
              />
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
