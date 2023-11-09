import styled from "@emotion/styled/macro";

const NewsContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(221, 211, 211);
  padding: 16px;
  max-width: 700px;
  margin: auto;
  color: white;
  flex-direction: column;
  justify-content: center;
`;

const NewsImage = styled.img`
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 16px;
`;

const NewsText = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1em;
`;

const NewsHeadlineStyle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const NewsBody = styled.p`
  font-size: 14px;
`;

const ButtonSize = styled.div`
  color: white;
  padding: 10px 40px;
  border-radius: 5px;
  border: 2px solid green;
  font-weight: bold;
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

export {
  NewsContainer,
  NewsBody,
  NewsHeadlineStyle,
  NewsImage,
  NewsText,
  ButtonSize,
  ButtonContainer,
};
