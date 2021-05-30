import { Switch, Route } from "react-router";
import Overview from "./Overview";
import Cohorts from "./Cohorts";

function Dashboard() {
  return (
    <div className="container-fluid h-100 w-100">
      <Switch>
        <Route path="/:enrollmentId">
          <Overview />
        </Route>
        <Route path="/">
          <Cohorts />
        </Route>
      </Switch>
    </div>
  );
}

export default Dashboard;
