import bluelock from "./bluelock.jpg";
import {
  ButtonContainer,
  ButtonSize,
  NewsBody,
  NewsContainer,
  NewsHeadlineStyle,
  NewsImage,
  NewsText,
} from "./newsStyle";

function NewsHeadline() {
  return (
    <NewsContainer>
      <NewsText>
        <NewsHeadlineStyle>News article headline</NewsHeadlineStyle>
        <NewsBody>
          SCOOP: Crypto exchange @krakenfx is considering bids to build its own
          layer-2 blockchain, in talks with @0xPolygonLabs, @the_matter_labs
          @nil_foundation, sources tell @cryptauxmargaux
        </NewsBody>
      </NewsText>
      <NewsImage src={bluelock} />
      <ButtonContainer>
        <ButtonSize>75%</ButtonSize>
        <ButtonSize>25%</ButtonSize>
        <ButtonSize>All In</ButtonSize>
        <ButtonSize>25%</ButtonSize>
        <ButtonSize>75%</ButtonSize>
      </ButtonContainer>
    </NewsContainer>
  );
}

export default NewsHeadline;
