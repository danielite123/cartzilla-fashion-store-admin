import axios, { AxiosRequestConfig, Method } from "axios";
import { paths } from "@/routes/path";
import { API_URL, LOGIN_PATH } from "@/config-global";
import {
  localStorageGetItem,
  localStorageLogout,
  localStorageRemoveItem,
} from "@/utils/strorage-available";

const axiosInstance = axios.create({ baseURL: API_URL });

const removeToken = (): void => {
  localStorageRemoveItem("access_token");
};

axiosInstance.interceptors.request.use((config) => {
  const rawAuth = localStorageGetItem("auth");

  if (rawAuth) {
    try {
      const parsed = JSON.parse(rawAuth);
      const token = parsed?.state?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token in parsed auth");
      }
    } catch (e) {
      console.error("Failed to parse auth from localStorage:", e);
    }
  } else {
    console.warn("⚠️ No auth found in localStorage");
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const errorCode = error.response.data?.code;

      if (errorCode === "invalid_or_expired_access_token") {
        localStorageLogout();
        const returnTo = window.location.pathname;
        window.location.href = `${paths.auth.login}?returnTo=${returnTo}`;
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

interface FetcherOptions {
  isPublic?: boolean;
}

export const fetcher = async <T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> => {
  const { isPublic = false } = options;

  try {
    const res = await axiosInstance.get<T>(url);
    return res.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !isPublic
    ) {
      removeToken();
      if (typeof window !== "undefined") {
        window.location.href = `${LOGIN_PATH}?returnTo=${window.location.pathname}`;
      }
    }
    throw error;
  }
};

interface MutatorParams<D> {
  url: string;
  method: Method;
  data?: D;
  config?: AxiosRequestConfig;
}

export const mutator = async <T, D>({
  url,
  method,
  data,
  config,
}: MutatorParams<D>): Promise<T> => {
  try {
    const res = await axiosInstance.request<T>({
      url,
      method,
      data,
      ...config,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;

export const endpoints = {
  auth: {
    login: "/auth/login/admin",
    register: "/auth/register/admin",
  },
  user: {
    profile: "/users/profile",
  },
};
