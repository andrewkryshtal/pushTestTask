import { QueryClient } from "react-query";
import ApiServiceImpl from "./apiService";
import { AxiosHttpClient } from "./clients/axiosHttpClient";

export const queryClient = new QueryClient();

const axiosHttpClient = new AxiosHttpClient();
// here we can use any other http client like fetchHttpClient
export const apiService = new ApiServiceImpl(axiosHttpClient);
