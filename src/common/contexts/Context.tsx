import { createContext } from "react";

interface ContextType {
  loading: number;
  changeLoading: (n: number) => void;
  clearLoading: () => void;
}

export const Context = createContext<ContextType>({
  loading: 0,
  changeLoading: () => { },
  clearLoading: () => { },
});
