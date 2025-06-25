export const localStorageGetItem = (key: string) => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
};

export const localStorageSetItem = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
};

export const localStorageRemoveItem = (key: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};

export const localStorageLogout = () => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("access_token");
};
