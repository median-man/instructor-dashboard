import { useEffect } from "react";
import { Switch, Route, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCohorts, useStudents } from "./bcs";

const MAX_ABSENCES = 5;

function Dashboard() {
  return (
    <div className="container">
      <Switch>
        <Route path="/:enrollmentId">
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

function Overview() {
  const { enrollmentId } = useParams();
  const students = useStudents(enrollmentId);
  useEffect(() => {
    students.load();
  }, [students]);
  if (students.error) {
    return <p>{students.error}</p>;
  }
  if (students.pending || !students.isLoaded) {
    return <p>Loading students...</p>;
  }
  return <StudentTable students={Array.from(students.result.values())} />;
}

function StudentTable({ students }) {
  console.log(students);
  return (
    <table className="table table-striped mt-5">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Absent</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentTableRow key={student.id} student={student} />
        ))}
      </tbody>
    </table>
  );
}

function StudentTableRow({ student }) {
  const { firstName, lastName, totalAbsent } = student;
  let trClassName = "";
  if (totalAbsent > MAX_ABSENCES) {
    trClassName = "table-danger";
  } else if (totalAbsent > MAX_ABSENCES - 1) {
    trClassName = "table-warning";
  }
  return (
    <tr className={trClassName}>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{totalAbsent}</td>
    </tr>
  );
}

export default Dashboard;
