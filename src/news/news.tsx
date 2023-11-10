import { formatDate, useExtractData } from "../utils/utils";
import bluelock from "./bluelock.jpg";
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

function NewsButtons() {
  return (
    <ButtonContainer>
      <ButtonSize>75%</ButtonSize>
      <ButtonSize>25%</ButtonSize>
      <ButtonSize>All In</ButtonSize>
      <ButtonSize>25%</ButtonSize>
      <ButtonSize>75%</ButtonSize>
    </ButtonContainer>
  );
}

function NewsHeadline() {
  const { title, newsHeadline, url, link, time, image, video } =
    useExtractData();
  const timeFormatted = formatDate(time);
  return (
    <NewsContainer>
      <HeaderContainer>
        <NewsHeadlineStyle>{title}</NewsHeadlineStyle>
        <Time>{timeFormatted}</Time>
      </HeaderContainer>
      <NewsText>
        <NewsBody
          as="a"
          href={link ? link : url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {newsHeadline}
        </NewsBody>
      </NewsText>
      <ImageContainer>
        {video ? (
          <NewsVideo controls src={video} />
        ) : image ? (
          <NewsImage src={image} alt="News" />
        ) : null}
      </ImageContainer>
      <NewsButtons />
    </NewsContainer>
  );
}

export { NewsHeadline };
