import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { useCallback } from "react";
import { LoginForm } from "@/components/LoginForm/LoginForm";

export default function Login() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: 12px;
`;
