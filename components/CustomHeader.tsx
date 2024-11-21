import { BackArrow } from "@/assets/svg/BackArrow";
import styled from "styled-components/native";

type TCustomHeader = {
  title: string;
  leftButtonHandler: () => void;
};

export default function CustomHeader({
  title,
  leftButtonHandler,
}: TCustomHeader) {
  return (
    <Container>
      <BackButtonContainer onPress={leftButtonHandler}>
        <BackArrow />
      </BackButtonContainer>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  left: 12px;
`;
