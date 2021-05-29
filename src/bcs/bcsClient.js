import jwtDecode from "jwt-decode";
import { NetworkError } from "../errors";

const API_BASENAME = "https://www.bootcampspot.com/api/instructor/v1";
const postJSON = async (endpoint, body, headers = {}) => {
  const res = await fetch(API_BASENAME + endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new NetworkError({ message: res.statusText, code: res.status });
  }
  return res.json();
};

const getJSON = async (endpoint, headers = {}) => {
  const res = await fetch(API_BASENAME + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  if (!res.ok) {
    throw new NetworkError({
      message: res.statusText || "Network error",
      status: res.status,
    });
  }
  return res.json();
};

/** Class representing an auth token returned by BCS Instructor API. */
class BcsAuthToken {
  get #token() {
    return window.sessionStorage.getItem("authToken");
  }

  set #token(token) {
    return window.sessionStorage.setItem("authToken", token);
  }

  /**
   * Get the unix time stamp for the expiration date/time of the token. Returns
   * -1 if there is no token.
   *
   * @returns {number} The unix time stamp (milliseconds)
   */
  get expiresAt() {
    if (!this.#token) {
      return -1;
    }
    const { minutesTimeout, creationTime } = jwtDecode(this.#token);
    return minutesTimeout * 60 * 1000 + Date.parse(creationTime);
  }

  /**
   *
   * @returns {String} The token string.
   */
  toString() {
    return this.#token;
  }

  clear() {
    window.sessionStorage.removeItem("authToken");
  }

  /**
   * Sets the token
   *
   * @param {string} token token from bcs api
   */
  set(token) {
    this.#token = token;
  }
}

/**
 * Class which provides methods for accessing data from the BCS Instructor API.
 */
class BcsClient {
  #cache = new Map();
  #authToken = new BcsAuthToken();

  /**
   * Returns time stamp of token expiration or 0.
   *
   * @returns {number} Unix ts for auth expiration. (milliseconds)
   */
  get authExpiresAt() {
    return this.#authToken.expiresAt;
  }

  get isLoggedIn() {
    return Date.now() < this.authExpiresAt;
  }

  get #authHeader() {
    return { authToken: this.#authToken };
  }

  /**
   * Sends login request to BCS API and updates this.#authToken with the
   * response. Throws if the login fails.
   *
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const res = await postJSON("/login", { email, password });
    if (res.errorCode) {
      throw new Error(res.errorCode);
    }
    this.#authToken.set(res.authenticationInfo.authToken);
  }

  /**
   * Remove auth token and clear stored responses.
   */
  signOut() {
    this.#cache.clear();
    this.#authToken.clear();
  }

  /**
   * Return response from cache. Falls back to making request and caches the
   * result before returning the result.
   *
   * @param {string} key cache storage key
   * @param {function} requestor Async function making the request.
   * @returns {Promise<*>} Result from requestor.
   */
  async #withCache(key, requestor) {
    let res = this.#cache.get(key);
    if (!res) {
      res = await requestor();
      this.#cache.set(key, res);
    }
    return res;
  }

  /**
   * Fetch data from /me endpoint
   *
   * @returns {Promise<Object>}
   */
  me() {
    return this.#withCache("me", () => getJSON("/me", this.#authHeader));
  }

  /**
   * Fetch data from /sessions endpoint.
   *
   * @param {number} enrollmentId bcs enrollment id
   * @returns {Promise<Object>}
   */
  sessions(enrollmentId) {
    return this.#withCache("sessions", () =>
      postJSON("/sessions", { enrollmentId }, this.#authHeader)
    );
  }

  /**
   * Fetch data from /sessionDetail endpoint.
   *
   * @param {number} sessionId bcs session id
   * @returns {Promise<Object>}
   */
  sessionDetail(sessionId) {
    return this.#withCache("sessionDetail", () =>
      postJSON("/sessionDetail", { sessionId }, this.#authHeader)
    );
  }

  /**
   * Fetch data from /assignments endpoint.
   *
   * @param {number} enrollmentId bcs enrollment id
   * @returns {Promise<Object>}
   */
  assignments(enrollmentId) {
    return this.#withCache("assignments", () =>
      postJSON("/assignments", { enrollmentId }, this.#authHeader)
    );
  }

  /**
   * Fetch data from /assignmentDetail endpoint.
   *
   * @param {number} assignmentId bcs assignment id
   * @returns {Promise<Object>}
   */
  assignmentDetail(assignmentId) {
    return this.#withCache("assignmentDetail", () =>
      postJSON("/assignmentDetail", { assignmentId }, this.#authHeader)
    );
  }
}

export const bcsClient = new BcsClient();
