import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useCohorts } from "../bcs";
import { useDocumentMeta } from "../util";
import Loader from "../common/Loader";

function Cohorts() {
  const cohorts = useCohorts();
  useDocumentMeta({ title: "Select a cohort" });
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
    <main className="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="h3 mb-5">Select a course:</h1>
      <div className="card">
        <ul className="list-group list-group-flush">
          {cohorts.result.map(({ name, enrollmentId }) => (
            <Link
              key={enrollmentId}
              to={`/${enrollmentId}`}
              className="list-group-item list-group-item-action"
            >
              {name}
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Cohorts;
