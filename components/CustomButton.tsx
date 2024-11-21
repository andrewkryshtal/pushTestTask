import styled from "styled-components/native";
import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";

type TCustomButton = {
  onPressHandler: () => void;
  title: string;
  disabled: boolean;
  className?: string;
};

const linearGradientPositions = {
  start: { x: 1, y: 0 },
  end: { x: 0, y: 1 },
};

export default function CustomButton({
  onPressHandler,
  title,
  disabled,
  className,
}: TCustomButton) {
  return (
    <StyledTouchableOpacity
      className={className}
      onPress={onPressHandler}
      disabled={disabled}
    >
      <StyledLinearGradient
        start={linearGradientPositions.start}
        end={linearGradientPositions.end}
        colors={["#51C7FE", "#338BFF"]}
      />
      <StyledText>{title}</StyledText>
    </StyledTouchableOpacity>
  );
}

const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  padding: 10px 20px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  width: 100%;
  height: 40px;
  border-radius: 80px;
  text-align: center;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.colors.buttonTextColor};
  font-size: 16px;
  font-weight: 500;
  font-family: "NotoSans";
`;

const StyledLinearGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 80px;
`;
