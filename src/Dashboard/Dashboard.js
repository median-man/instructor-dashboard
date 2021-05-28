import { Switch, Route } from "react-router";
import Overview from "./Overview";
import Cohorts from "./Cohorts";

function Dashboard() {
  return (
    <div className="container">
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
