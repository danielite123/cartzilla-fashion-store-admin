/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/config-global";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { localStorageGetItem, localStorageLogout } from "./storage";
import { paths } from "@/routes/paths";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorageGetItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.errorCode === "invalid_or_expired_access_token") {
        localStorageLogout();
        const searchParams = new URLSearchParams({
          returnTo: window.location.pathname,
        }).toString();

        window.location.href = `${paths.auth.login}?${searchParams}`;
      }
    }
    return Promise.reject(error);
  }
);

export const mutator = async <Data>(
  request: AxiosRequestConfig
): Promise<Data> => {
  try {
    const res = await axiosInstance(request);
    return res.data;
  } catch (e: any) {
    if (e instanceof AxiosError) {
      throw e.response as any;
    }
    throw e;
  }
};

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await axiosInstance.get(url, { ...config });
    return res.data;
  } catch (error: any) {
    if (
      error.response?.status === 401 &&
      error.response?.data?.errorCode === "invalid_or_expired_access_token"
    ) {
      localStorageLogout();
      window.location.href = "/login";
    }
    throw error;
  }
};

export const endpoints = {
  auth: {
    login: "/auth/login/admin",
    register: "/auth/register/admin",
  },
};
