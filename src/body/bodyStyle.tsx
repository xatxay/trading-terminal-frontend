import styled from "@emotion/styled/macro";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #282c34;
`;

const LeftContainer = styled.div`
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopRightContainer = styled.div`
  height: 50vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MiddleRightContainer = styled.div`
  height: 25vh;
`;

const BottomRightContainer = styled.div`
  height: 25vh;
`;

export {
  Container,
  LeftContainer,
  RightContainer,
  TopRightContainer,
  BottomRightContainer,
  MiddleRightContainer,
};
