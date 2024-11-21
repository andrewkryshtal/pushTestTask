import { HttpClient } from "./httpInstance";

type TLoginParams = {
  username: string;
  password: string;
};

export const createApiService = (httpClient: HttpClient) => ({
  login: async ({ username, password }: TLoginParams) => {
    const response = await httpClient.post<Record<string, any>>("/auth/login", {
      username,
      password,
      expiresInMins: 1, // optional, default is 60
    });

    return response;
  },

  refresh: async (refreshToken: string) => {
    const response = await httpClient.post<Record<string, any>>(
      "/auth/refresh",
      {
        refreshToken,
        expiresInMins: 1, // optional, default is 60
      }
    );

    return response;
  },

  test: async () => await httpClient.get("/test"),
});
