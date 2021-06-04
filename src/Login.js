import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import * as idb from "idb-keyval";
import { useBcs } from "./bcs";
import { useDocumentMeta } from "./util";

const rememberEmail = (email) => idb.set("login:email", email);
const clearEmail = () => idb.del("login:email");
const getEmail = () => idb.get("login:email");

// Based on https://reactrouter.com/web/example/auth-workflow. The login form
// will redirect back to the page the use tried to access after a successful
// login. Falls back to "/" if there is no history yet.
function Login() {
  const history = useHistory();
  const location = useLocation();
  const { login, isLoggedIn, pending, error } = useBcs();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    remember: false,
    dirty: false,
  });

  useDocumentMeta({ title: "Login | Bootcamp Instructor Dashboard" });

  // Redirect if the user is logged in.
  useEffect(() => {
    if (isLoggedIn) {
      // Get path the user came from (see ProtectedRoute). Fallback to "/"
      const from = { pathname: location.state?.from?.pathname || "/" };
      history.replace(from);
    }
  }, [isLoggedIn, history, location]);

  // initialize email from storage
  useEffect(() => {
    getEmail().then((email) =>
      setFormState((prevState) => ({
        ...prevState,
        remember: !!email,
        email: email || "",
      }))
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      dirty: true,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = () => {
    const { email, password, dirty } = formState;
    return email.trim() && password.trim() && dirty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, remember } = formState;
    const bcsCredentials = {
      email: email.trim(),
      password: password.trim(),
    };
    setFormState((prevState) => ({ ...prevState, dirty: false }));
    if (remember) {
      await rememberEmail(bcsCredentials.email);
    } else {
      await clearEmail();
    }
    login(bcsCredentials);
  };

  return (
    <main
      style={{ maxWidth: 330 }}
      className="w-100 py-5 mx-auto h-100 d-flex align-items-center"
    >
      <form onSubmit={handleSubmit}>
        <Heading />
        <FormControl
          label="Email address"
          type="email"
          controlId="email"
          style={{
            marginBottom: -1,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          value={formState.email}
          onChange={handleInputChange}
          disabled={pending}
        />
        <FormControl
          label="Password"
          type="password"
          controlId="password"
          style={{
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          }}
          value={formState.password}
          onChange={handleInputChange}
          disabled={pending}
        />
        <RememberMeControl
          controlId="remember"
          checked={formState.remember}
          onChange={handleInputChange}
          disabled={pending}
        />
        <SubmitButton disabled={!isFormValid() || pending} pending={pending} />
        <Alert show={error && !formState.dirty}>{error}</Alert>
      </form>
    </main>
  );
}

function Heading() {
  return (
    <h1 className="h3 mb-3 fw-normal">
      Please sign in with your BCS Credentials
    </h1>
  );
}

function FormControl({ label, controlId, ...inputProps }) {
  return (
    <div className="form-floating">
      <input
        name={controlId}
        id={controlId}
        className="form-control"
        {...inputProps}
      />
      <label htmlFor={controlId}>{label}</label>
    </div>
  );
}

function RememberMeControl({ controlId, ...inputProps }) {
  return (
    <div className="my-3 text-center">
      <label>
        <input name={controlId} type="checkbox" {...inputProps} /> Remember me
      </label>
    </div>
  );
}

// Alert uses css transition to grow/shrink on Y axis.
function Alert({ children, show }) {
  return (
    <div
      className="mt-3"
      style={{
        maxHeight: show ? 100 : 0,
        transition: `max-height ease 400ms`,
        overflow: "hidden",
        height: "auto",
      }}
    >
      <div className="alert alert-danger" role="alert">
        {children}
      </div>
    </div>
  );
}

function SubmitButton({ pending, ...btnProps }) {
  return (
    <button
      type="submit"
      className="w-100 btn btn-lg btn-primary"
      {...btnProps}
    >
      {pending ? <ButtonSpinner>Logging in...</ButtonSpinner> : "Submit"}
    </button>
  );
}

function ButtonSpinner({ children }) {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm me-3"
        role="status"
        aria-hidden="true"
      />
      {children}
    </>
  );
}

export default Login;
