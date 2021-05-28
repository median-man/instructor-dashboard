import { NetworkError } from "../errors";

const postJSON = async (endpoint, body, headers = {}) => {
  const res = await fetch(
    `https://www.bootcampspot.com/api/instructor/v1${endpoint}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    throw new NetworkError({ message: res.statusText, code: res.status });
  }
  return res.json();
};

const getJSON = async (endpoint, headers = {}) => {
  const res = await fetch("https://www.bootcampspot.com/api/instructor/v1/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  if (!res.ok) {
    console.log(res);
    throw new NetworkError({
      message: res.statusText || "Network error",
      status: res.status,
    });
  }
  return res.json();
};

export const login = async (bcsCredentials) =>
  postJSON("/login", bcsCredentials);

export const me = ({ authToken }) => getJSON("/me", { authToken });

export const sessions = ({ authToken, enrollmentId }) =>
  postJSON("/sessions", { enrollmentId }, { authToken });

export const sessionDetail = ({ authToken, sessionId }) =>
  postJSON("/sessionDetail", { sessionId }, { authToken });

export const assignments = ({ authToken, enrollmentId }) =>
  postJSON("/assignments", { enrollmentId }, { authToken });

export const assignmentDetail = ({ authToken, assignmentId }) =>
  postJSON("/assignmentDetail", { assignmentId }, { authToken });
