import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { BcsProvider } from "./bcs";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import TopBar from "./TopBar";

function App() {
  return (
    <BcsProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <TopBar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </BcsProvider>
  );
}

export default App;
