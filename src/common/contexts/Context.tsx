// import { createContext } from "react";

// interface ContextType {
//   loading: number;
//   changeLoading: (n: number) => void;
//   clearLoading: () => void;
//   // theme: string;
//   // setTheme: (s: string) => void;
// }
// export const Context = createContext({
//   loading: 0,
//   changeLoading: () => { },
//   clearLoading: () => { },
//   // theme: "",
//   // setTheme: () => {}
// } as ContextType);


import { createContext } from "react";

interface ContextType {
  loading: number;
  changeLoading: (n: number) => void;
  clearLoading: () => void;
}

export const Context = createContext<ContextType>({
  loading: 0,
  changeLoading: () => {},
  clearLoading: () => {},
});
