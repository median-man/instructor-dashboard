import { useEffect } from "react";
import { useParams } from "react-router";
import { useCohort } from "../bcs";
import { useDocumentMeta } from "../util";
import Calendar from "./Calendar";
import GradesPieChart from "./GradesPieChart";
import ProgressBar from "./ProgressBar";

const assignments = [
  {
    assignmentId: "1",
    title: "Assignment 1: Advanced CSS Portfolio",
    dueDate: Date.parse("July 2, 2021 11:59 PM"),
    expectedTotal: 20,
    ungraded: 2,
    unSubmitted: 3,
    incomplete: 1,
    grades: {
      a: 3,
      b: 7,
      c: 3,
      d: 0,
      f: 1,
    },
  },
  {
    assignmentId: "2",
    title: "Assignment 2: Password Generator",
    dueDate: Date.parse("July 28, 2021 11:59 PM"),
    expectedTotal: 20,
    ungraded: 10,
    unSubmitted: 1,
    incomplete: 0,
    grades: {
      a: 3,
      b: 7,
      c: 0,
      d: 0,
      f: 1,
    },
  },
];

const pageTitle = (cohortName) =>
  cohortName ? `Assignments: ${cohortName}` : "Assignments";

function Assignments() {
  const { enrollmentId } = useParams();
  const cohort = useCohort({ enrollmentId: parseInt(enrollmentId) });

  useEffect(() => {
    cohort.load();
  }, [cohort]);
  useDocumentMeta({ title: pageTitle(cohort.result?.name) });
  return (
    <div
      className="mx-auto d-flex flex-column pt-3"
      style={{ maxWidth: "40rem" }}
    >
      {assignments.map((a) => (
        <div key={a.assignmentId} className="row my-3 shadow border-1 p-2">
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
