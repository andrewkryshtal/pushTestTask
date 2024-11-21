import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import Constants from "expo-constants";
import { router } from "expo-router";
import {
  asyncStorageGetItem,
  asyncStorageSetItem,
} from "@/storage/asyncStorage";
import { secureStorageSetItem } from "@/storage/securedStorage";
import { queryClient } from "@/api/http";

export default function Profile() {
  const [userDataState, setUserDataState] = useState(null);
  const backButtonHandler = () => {
    router.back();
  };

  const logoutHandler = async () => {
    await asyncStorageSetItem(userDataKey, null);
    await secureStorageSetItem(userDataKey, null);
    queryClient.clear();
    router.push(ERoutes.LOGIN);
  };

  useEffect(() => {
    (async () => {
      setUserDataState(await asyncStorageGetItem(userDataKey));
    })();
  }, []);

  return (
    <Container>
      <CustomHeader
        leftButtonHandler={backButtonHandler}
        title={`Hi, ${userDataState?.firstName} ${userDataState?.lastName}`}
      />
      <CustomButton onPressHandler={logoutHandler} title="Logout" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 12px;
  padding-top: ${Constants.statusBarHeight}px;
  background-color: ${({ theme }) => theme.colors.background};
`;
