import { createContext, ReactNode, useContext, useReducer } from "react";
import { AppAction, initialState, reducer } from "./App";

const AppstateContext = createContext(initialState);
const AppDispatchContext = createContext<(action: AppAction) => void>(
  (_action: AppAction) => undefined
);

export function AppstateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppstateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppstateContext.Provider>
  );
}

export function useAppstate() {
  const context = useContext(AppstateContext);
  if (!context) {
    throw Error("Må brukes innenfor en AppstateProvider!");
  }
  return context;
}

export function useAppdispatch() {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw Error("Må brukes innenfor en AppstateProvider!");
  }
  return context;
}
