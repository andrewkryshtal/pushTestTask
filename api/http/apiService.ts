import { HttpClient } from "./httpInstance";

interface ILoginParams {
  username: string;
  password: string;
}

interface IApiService {
  login(params: ILoginParams): Promise<Record<string, any>>;
  refresh(refreshToken: string): Promise<Record<string, unknown>>;
  test(): Promise<Record<string, unknown>>;
}

class ApiServiceImpl implements IApiService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login({
    username,
    password,
  }: ILoginParams): Promise<Record<string, any>> {
    const response = await this.httpClient.post<
      Record<string, any>,
      Record<string, any>
    >("/auth/login", {
      username,
      password,
      expiresInMins: 1, // optional, default is 60
    });

    return response;
  }

  async refresh(refreshToken: string): Promise<Record<string, unknown>> {
    const response = await this.httpClient.post<
      Record<string, unknown>,
      Record<string, unknown>
    >("/auth/refresh", {
      refreshToken,
      expiresInMins: 1, // optional, default is 60
    });

    return response;
  }

  async test(): Promise<Record<string, unknown>> {
    return await this.httpClient.get("/test");
  }
}

export default ApiServiceImpl;
