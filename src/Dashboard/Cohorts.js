import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCohorts } from "../bcs";

function Cohorts() {
  const cohorts = useCohorts();
  useEffect(() => {
    cohorts.load();
  }, [cohorts]);

  if (cohorts.pending || !cohorts.isLoaded) {
    return <div>Loading cohorts...</div>;
  }
  if (cohorts.error) {
    return <div>Error loading cohorts. {cohorts.error.message}</div>;
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
