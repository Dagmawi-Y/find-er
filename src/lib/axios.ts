import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

// Get the access token from cookies
let userId;

const getAccessTokenFromCookies = (): string | null => {
  const cookies = document.cookie.split(";");
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("access_token="),
  );

  if (accessTokenCookie) {
    return accessTokenCookie.split("=")[1];
  }

  return null;
};

// Create an instance of axios with a custom request interceptor
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333/api/v1", // Replace with your API base URL
});

// Add a request interceptor to include the access token in the headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessTokenFromCookies();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
