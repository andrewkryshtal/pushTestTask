import CustomButton from "@/components/CustomButton";
import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { inputStylingTheme, themeObject } from "@/constants/themeObject";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "./validationSchema";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "@/hooks/useAuth";

export const LoginForm = () => {
  const mutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    mutation.mutate(data);

    // i did it to cover some design cases
    if (mutation.isError) {
      setError("username", {
        type: "manual",
        message: "username incorrect",
      });
      setError("password", {
        type: "manual",
        message: "wrong password",
      });
    }
  };

  return (
    <>
      <Controller
        name="username"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputWrapper>
            <StyledTextInput
              label="Username"
              onChangeText={onChange}
              value={value}
              mode="outlined"
              style={{ backgroundColor: "#fff" }}
              error={errors.username ? true : false}
              theme={inputStylingTheme}
            />
            {errors.username && (
              <ErrorText>{errors.username.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputWrapper>
            <StyledTextInput
              secureTextEntry={true}
              label="Password"
              onChangeText={onChange}
              value={value}
              mode="outlined"
              activeOutlineColor={themeObject.colors.activeOutlineColor}
              style={{ backgroundColor: "#fff" }}
              error={errors.password ? true : false}
              theme={inputStylingTheme}
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />
      <CustomButton
        onPressHandler={handleSubmit(onSubmit)}
        title={"Login"}
        disabled={false}
      />
    </>
  );
};

const StyledTextInput = styled(TextInput)`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme?.colors?.background};
`;

const InputWrapper = styled.View`
  width: 100%;
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
  font-family: "NotoSans";
  margin-top: 5px;
`;
