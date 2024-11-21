import React from "react";
import CustomButton from "@/components/CustomButton";
import styled from "styled-components";
import { router } from "expo-router";
import { ERoutes } from "@/constants/constantsVariables";

export default function Home() {
  const onLoginPressHandler = () => {
    router.push(ERoutes.LOGIN);
  };

  return (
    <Container>
      <CustomButton onPressHandler={onLoginPressHandler} title="Go to login" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;
