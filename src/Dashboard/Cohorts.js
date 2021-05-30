import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useCohorts } from "../bcs";
import Loader from "./Loader";

function Cohorts() {
  const cohorts = useCohorts();
  useEffect(() => {
    cohorts.load();
  }, [cohorts]);

  if (cohorts.pending || !cohorts.isLoaded) {
    return <Loader>Loading cohorts...</Loader>;
  }
  if (cohorts.error) {
    return <p>Error loading cohorts. {cohorts.error.message}</p>;
  }
  if (cohorts.result.length === 0) {
    return <p>You don't have any cohorts.</p>;
  }
  if (cohorts.result.length === 1) {
    return <Redirect to={`/${cohorts.result[0].enrollmentId}`} />;
  }
  return (
    <>
      <h1>Please choose a cohort</h1>
      {cohorts.result.map(({ name, enrollmentId }) => (
        <Link
          key={enrollmentId}
          to={`/${enrollmentId}`}
          className="btn btn-outline-secondary"
        >
          {name}
        </Link>
      ))}{" "}
    </>
  );
}

export default Cohorts;
