import styled from "@emotion/styled/macro";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #282c34;
`;

const LeftContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopRightContainer = styled.div`
  height: 75vh;
  overflow: auto;
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
};
