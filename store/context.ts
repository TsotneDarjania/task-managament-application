import { createContext, useContext } from "react";
import TaskStore from "./store";

interface StoreContext {
  taskStore: typeof TaskStore.Type;
}

export const storeContext = createContext<StoreContext | null>(null);

export const useStore = (): StoreContext => {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
