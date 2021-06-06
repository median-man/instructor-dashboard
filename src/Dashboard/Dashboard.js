import { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router";
import { useCohorts } from "../bcs";
import Loader from "../common/Loader";
import Overview from "../Overview";
import Cohorts from "./Cohorts";
// import SideBar from "./SideBar";

function Dashboard() {
  const match = useRouteMatch("/:enrollmentId?");
  const enrollmentId = parseInt(match.params.enrollmentId);
  const cohorts = useCohorts();
  useEffect(() => {
    cohorts.load();
  }, [cohorts]);

  const cohort =
    cohorts.result?.find((c) => c.enrollmentId === enrollmentId) || null;

  return (
    <div className="h-100 w-100 d-flex">
      {/* <SideBar cohorts={cohorts} currentCohort={cohort} /> */}
      <div className="container-fluid">
        {!cohorts.isLoaded ? (
          <Loader>Loading cohorts...</Loader>
        ) : cohorts.error ? (
          <p>Error loading cohorts. {cohorts.error.message}</p>
        ) : (
          <Switch>
            <Route path="/:enrollmentId">
              <Overview cohort={cohort} />
            </Route>
            <Route path="/">
              <Cohorts
                cohorts={cohorts.result}
                pending={cohorts.pending}
                error={cohorts.error?.message || ""}
                isLoaded={cohorts.isLoaded}
              />
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
