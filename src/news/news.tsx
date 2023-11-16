import {
  formatDate,
  handleClick,
  useExtractData,
  useGetPrice,
} from "../utils/utils";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  ButtonContainer,
  ButtonSize,
  HeaderContainer,
  ImageContainer,
  ModalContent,
  ModalOverlay,
  NewsBody,
  NewsContainer,
  NewsHeadlineStyle,
  NewsImage,
  NewsText,
  NewsVideo,
  Percentage,
  Time,
} from "./newsStyle";

Modal.setAppElement("#root");

const NewsButtons: React.FC<{
  coin: string;
  percentage?: number;
  addLogMessage: (message: string) => void;
}> = ({ coin, percentage, addLogMessage }) => {
  console.log("coins: ", coin);
  const sell = "Sell";
  const buy = "Buy";
  return (
    <ButtonContainer>
      <ButtonSize
        onClick={async () => handleClick("/75", addLogMessage, sell, coin)}
      >
        75%
      </ButtonSize>
      <ButtonSize
        onClick={async () => handleClick("/25", addLogMessage, sell, coin)}
      >
        25%
      </ButtonSize>
      <ButtonSize primary>
        {coin}{" "}
        {percentage !== undefined && (
          <Percentage positive={percentage > 0}>{percentage}%</Percentage>
        )}
      </ButtonSize>
      <ButtonSize
        primary
        onClick={async () => handleClick("/25", addLogMessage, buy, coin)}
      >
        25%
      </ButtonSize>
      <ButtonSize
        primary
        onClick={async () => handleClick("/75", addLogMessage, buy, coin)}
      >
        75%
      </ButtonSize>
    </ButtonContainer>
  );
};

const NewsHeadline: React.FC<{ addLogMessage: (message: string) => void }> = ({
  addLogMessage,
}) => {
  const messages = useExtractData();
  const { ticker, percentage } = useGetPrice();
  const [tickerPercentage, setTickerPercentage] = useState<{
    [key: string]: number;
  }>({});
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>("");

  const openModal = (img: string) => {
    setActiveImage(img);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
              <NewsImage
                src={message.image}
                alt="News"
                onClick={() => message.image && openModal(message.image)}
              />
            ) : null}
          </ImageContainer>
          {message.suggestions && message.suggestions.length > 0 ? (
            message.suggestions.map((sugguest) => (
              <NewsButtons
                key={sugguest}
                coin={sugguest || "N/A"}
                percentage={tickerPercentage[sugguest]}
                addLogMessage={addLogMessage}
              />
            ))
          ) : (
            <NewsButtons coin="N/A" addLogMessage={addLogMessage} />
          )}
        </NewsContainer>
      ))}
      <ModalOverlay
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
      >
        <ModalContent>
          {activeImage && <img src={activeImage} alt="Full Screen" />}
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export { NewsHeadline };
