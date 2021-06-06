import { Switch, Route, useRouteMatch } from "react-router";
import Overview from "../Overview";
import Cohorts from "./Cohorts";

function Dashboard() {
  const match = useRouteMatch("/:enrollmentId?");
  const { enrollmentId } = match.params;

  return (
    <div className="container-fluid h-100 w-100">
      <Switch>
        <Route path="/:enrollmentId">
          <Overview enrollmentId={parseInt(enrollmentId)} />
        </Route>
        <Route path="/">
          <Cohorts />
        </Route>
      </Switch>
    </div>
  );
}

export default Dashboard;
