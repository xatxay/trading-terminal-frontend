import styled from "@emotion/styled/macro";
import Modal from "react-modal";

const NewsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid rgb(221, 211, 211);
  padding: 16px;
  max-width: 700px;
  margin: auto;
  color: white;
  flex-direction: column;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NewsImage = styled.img`
  flex-shrink: 0;
  max-width: 250px;
  max-height: 250px;
  object-fit: contain;
`;

const NewsText = styled.div`
  flex-grow: 1;
  display: flex;
  max-width: 700px;
  flex-direction: column;
  justify-content: center;
  padding: 0 1em;
`;

const NewsHeadlineStyle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: orange;
`;

const NewsBody = styled.a`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: 500;
  line-height: 2;
  color: white;
  text-decoration: none;
  &:hover {
    color: orange;
  }
`;

const ButtonSize = styled.div<{ primary?: boolean; middle?: boolean }>`
  color: white;
  padding: 10px 40px;
  border-radius: 5px;
  font-size: 15px;
  border: ${(props) => (props.primary ? "2px solid green" : "2px solid red")};
  cursor: pointer;
  &:hover {
    background-color: #ffae42;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

const NewsVideo = styled.video`
  flex-shrink: 0;
  max-width: 250px;
  max-height: 250px;
  object-fit: contain;
`;

const Time = styled.span`
  color: #cccccc84;
  font-size: 13px;
`;

const Percentage = styled.span<{ positive: boolean }>`
  color: ${(props) => (props.positive ? "green" : "red")};
`;

const ModalOverlay = styled(Modal)`
  background-lor: rgba(0, 0, 0, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: black;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  max-height: 90%;
  margin: auto;
`;

export {
  NewsContainer,
  NewsBody,
  NewsHeadlineStyle,
  NewsImage,
  NewsText,
  ButtonSize,
  ButtonContainer,
  NewsVideo,
  ImageContainer,
  HeaderContainer,
  Time,
  Percentage,
  ModalOverlay,
  ModalContent,
};
