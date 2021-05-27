import { createContext, useContext, useEffect, useState } from "react";
import * as bcsService from "./bcsService";

const bcsContext = createContext({
  isLoggedIn: false,
  pending: false,
  signOut: () => {},
  login: ({ email, password }) => {},
  cohorts: () => {},
});

export function BcsProvider({ children }) {
  const [state, setState] = useState({
    error: "",
    pending: true,
    isLoggedIn: false,
  });

  useEffect(() => {
    bcsService.token().then((val) =>
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: !!val,
        pending: false,
      }))
    );
  }, []);

  const signOut = async () => {
    try {
      await bcsService.signOut();
      setState((prevState) => ({ ...prevState, isLoggedIn: false }));
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        error: "Unable to log out. Please try again.",
      }));
    }
  };

  const loginError = (error) => {
    return setState((prevState) => ({
      ...prevState,
      pending: false,
      isLoggedIn: false,
      error,
    }));
  };

  const login = async ({ email, password }) => {
    setState((prevState) => ({ ...prevState, pending: true }));
    const { error } = await bcsService.login({ email, password });
    if (error?.message === "INVALID_CREDENTIALS") {
      return loginError("Invalid username or password");
    }
    if (error) {
      return loginError("An unexpected error occurred. Please try again.");
    }
    setState((prevState) => ({
      ...prevState,
      pending: false,
      isLoggedIn: true,
      error: "",
    }));
  };

  return (
    <bcsContext.Provider value={{ ...state, login, signOut }}>
      {children}
    </bcsContext.Provider>
  );
}

export const useBcs = () => useContext(bcsContext);

export const useCohorts = () => {
  const [state, setState] = useState({
    pending: false,
    result: null,
    error: null,
    isLoaded: false,
  });
  const load = async () => {
    if (state.isLoaded || state.pending) return;
    setState((prevState) => ({ ...prevState, pending: true }));
    const { result, error } = await bcsService.cohorts();
    setState({ result, error, pending: false, isLoaded: true });
  };
  return { ...state, load };
};
