import { useEffect } from "react";
import { Switch, Route, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCohorts } from "./bcs";

function Dashboard() {
  return (
    <div className="container">
      <Switch>
        <Route path="/:cohortId">
          <Overview />
        </Route>
        <Route exact path="/">
          <Cohorts />
        </Route>
      </Switch>
    </div>
  );
}

function Cohorts() {
  const cohorts = useCohorts();
  useEffect(() => {
    cohorts.load();
  }, [cohorts]);

  if (cohorts.pending || !cohorts.isLoaded) {
    return <div>Loading cohorts...</div>;
  }
  if (cohorts.error) {
    return <div>Error loading cohorts. {cohorts.error}</div>;
  }
  return (
    <>
      <h1>Please choose a cohort</h1>
      {cohorts.result.map(({ name, id }) => (
        <Link key={id} to={`/${id}`} className="btn btn-outline-secondary">
          {name}
        </Link>
      ))}{" "}
    </>
  );
}

function Overview() {
  const { cohortId } = useParams();
  return <div>Viewing id: {cohortId}</div>;
}

export default Dashboard;
