import { useEffect } from "react";
import { useAssignments } from "../bcs";
import Loader from "../common/Loader";
import { useDocumentMeta } from "../util";
import Calendar from "./Calendar";
import GradesPieChart from "./GradesPieChart";
import ProgressBar from "./ProgressBar";

const pageTitle = (cohortName) =>
  cohortName ? `Assignments: ${cohortName}` : "Assignments";

function Assignments({ cohort }) {
  useDocumentMeta({ title: pageTitle(cohort.name) });
  const assignments = useAssignments(cohort.enrollmentId);
  useEffect(() => assignments.load(), [assignments]);

  if (!assignments.isLoaded) {
    return <Loader>Loading assignments...</Loader>;
  }
  if (assignments.error) {
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <p className="text-center lead">Unable to load assignments</p>
      </div>
    );
  }
  return (
    <div
      className="mx-auto d-flex flex-column pt-3"
      style={{ maxWidth: "40rem" }}
    >
      {assignments.result?.map((a) => (
        <div key={a.id} className="row my-3 shadow border-1 p-2">
          <div className="col-auto  pt-1">
            <Calendar date={a.dueDate} title="Assignment due date" />
          </div>
          <div className="col">
            <h5>{a.title}</h5>
            <div className="row">
              <div className="col">
                <div className="mb-1">
                  <p className="mb-0">
                    Submissions ({a.expectedTotal - a.unSubmitted}/
                    {a.expectedTotal})
                  </p>
                  <ProgressBar
                    value={a.expectedTotal - a.unSubmitted}
                    max={a.expectedTotal}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-0">
                    {/* submitted by not yet graded homework / total submitted */}
                    Grading ({a.expectedTotal - a.unSubmitted - a.ungraded}/
                    {a.expectedTotal - a.unSubmitted})
                  </p>
                  <ProgressBar
                    value={a.expectedTotal - a.unSubmitted - a.ungraded}
                    max={a.expectedTotal - a.unSubmitted}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-0">
                    {/* completed for a letter grade / total */}
                    Completion: {a.expectedTotal - a.incomplete - a.unSubmitted}
                    /{a.expectedTotal}
                  </p>
                  <ProgressBar
                    value={a.expectedTotal - a.incomplete - a.unSubmitted}
                    max={a.expectedTotal}
                  />
                </div>
              </div>
              <div className="col-md-4 d-none d-sm-flex justify-content-center">
                <GradesPieChart
                  grades={a.grades}
                  incomplete={a.incomplete}
                  total={a.expectedTotal - a.unSubmitted - a.ungraded}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Assignments;
