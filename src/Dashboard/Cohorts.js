import { Link, Redirect } from "react-router-dom";
import { useDocumentMeta } from "../util";

function Cohorts({ cohorts }) {
  useDocumentMeta({ title: "Select a cohort" });

  if (cohorts.length === 0) {
    return <p>You don't have any cohorts.</p>;
  }
  if (cohorts.length === 1) {
    return <Redirect to={`/${cohorts[0].enrollmentId}`} />;
  }
  return (
    <main className="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="h3 mb-5">Select a course:</h1>
      <div className="card">
        <ul className="list-group list-group-flush">
          {cohorts.map(({ name, enrollmentId }) => (
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
