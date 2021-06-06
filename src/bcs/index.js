import { createContext, useContext, useState } from "react";
import * as bcsService from "./bcsService";

const bcsContext = createContext({
  isLoggedIn: false,
  pending: false,
  signOut: () => {},
  login: ({ email, password }) => {},
  cohorts: () => {},
});

export function BcsProvider({ children }) {
  const [state, setState] = useState(() => ({
    error: "",
    pending: false,
    isLoggedIn: bcsService.isLoggedIn(),
  }));

  const signOut = async () => {
    bcsService.signOut();
    setState((prevState) => ({ ...prevState, isLoggedIn: false }));
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

const useAsyncRequestor = (requestor) => {
  const [state, setState] = useState({
    pending: false,
    result: null,
    error: null,
    isLoaded: false,
  });
  const load = async () => {
    if (state.isLoaded || state.pending) return;
    setState((prevState) => ({ ...prevState, pending: true }));
    const { result, error } = await requestor();
    setState({ result, error, pending: false, isLoaded: true });
  };
  return { ...state, load };
};

export const useCohorts = () => useAsyncRequestor(bcsService.cohorts);

export const useCohort = ({ enrollmentId }) =>
  useAsyncRequestor(() => bcsService.findCohort({ enrollmentId }));

export const useStudents = (enrollmentId) =>
  useAsyncRequestor(() => bcsService.students({ enrollmentId }));
