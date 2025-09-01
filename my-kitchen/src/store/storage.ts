// src/store/storage.ts
import type { WebStorage } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

const createNoopStorage = (): WebStorage => ({
  getItem(_key) {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem(_key) {
    return Promise.resolve();
  },
});

const storage: WebStorage =
  typeof window !== "undefined" ? localStorage : createNoopStorage();

export default storage;
