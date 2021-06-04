import { Route, Redirect } from "react-router-dom";
import { useBcs } from "../bcs";
function PrivateRoute({ children, ...rest }) {
  const { isLoggedIn } = useBcs();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
