import formatDate from "@bitty/format-date";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStudents } from "../bcs";
import { classNamesFromArray, compactArray } from "../util";
import OffCanvas from "./OffCanvas";

const MAX_ABSENCES = 5;

function Overview() {
  const { enrollmentId } = useParams();
  const [offCanvasState, setOffCanvasState] = useState({
    show: false,
    title: "",
    children: null,
  });
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

  const hideOffCanvas = () =>
    setOffCanvasState((prevState) => ({ ...prevState, show: false }));

  const handleHelp = () => {
    setOffCanvasState({
      show: true,
      title: "Dashboard Help",
      children: <DashboardHelp />,
    });
  };

  const handleSelectStudent = (student) => {
    setOffCanvasState({
      show: true,
      title: `${student.firstName} ${student.lastName}`,
      children: <StudentDetails student={student} />,
    });
  };

  return (
    <>
      <StudentTable
        onSelectStudent={handleSelectStudent}
        students={Array.from(students.result.values())}
        onHelp={handleHelp}
      />
      <OffCanvas onClose={hideOffCanvas} {...offCanvasState} />
    </>
  );
}

function DashboardHelp() {
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        Students failing to meet completion requirements are highlighted in
        pink.
      </li>
      <li className="list-group-item">
        Students at risk of failing to meet completion requirements are
        highlighted in yellow.
      </li>
    </ul>
  );
}

function StudentDetails({ student }) {
  return (
    <>
      <AbsencesSection attendance={student.attendance} />
      <HomeworkIssuesSection grades={student.grades} />
    </>
  );
}

function AbsencesSection({ attendance }) {
  const absentSess = attendance.filter((sess) => sess.absent);
  return (
    <>
      <h6>Absences</h6>
      {
        <ul className="list-group list-group-flush">
          {absentSess.length === 0 && <p>None</p>}
          {absentSess.map((sess) => (
            <li key={sess.startTime} className="list-group-item">
              {formatDate(new Date(sess.startTime), "M/D/YYYY")}{" "}
              {sess.excused && "excused"}
            </li>
          ))}
        </ul>
      }
    </>
  );
}

function HomeworkIssuesSection({ grades }) {
  const isIssue = (grade) =>
    (grade.status !== "graded" || grade.mark === "I") &&
    Date.parse(grade.assignment.effectiveDueDate) < Date.now();

  const listItems = compactArray(
    grades.filter(isIssue).map((grade) => {
      return <HomeworkIssueItem key={grade.assignment.title} grade={grade} />;
    })
  );
  return (
    <>
      <h6 className="mt-3">Homework Issues</h6>
      {listItems.length === 0 ? (
        <p>None</p>
      ) : (
        <ul className="list-group list-group-flush">{listItems}</ul>
      )}
    </>
  );
}

function HomeworkIssueItem({ grade }) {
  const { mark, status } = grade;
  const { title } = grade.assignment;

  let statusText = "not submitted";
  let statusColor = "danger";
  if (mark === "I") {
    statusText = "incomplete";
  } else if (status === "ungraded") {
    statusText = "ungraded";
    statusColor = "warning";
  }

  const badgeClassName = classNamesFromArray([
    "badge",
    `bg-${statusColor}`,
    statusColor === "warning" && "text-dark",
  ]);

  return (
    <li className="list-group-item d-flex align-items-center">
      <div style={{ minWidth: 90 }}>
        <span className={badgeClassName}>{statusText}</span>
      </div>
      <div className="ps-2">{title}</div>
    </li>
  );
}

function StudentTable({ students, onSelectStudent, onHelp }) {
  return (
    <table
      className="table table-sm table-hover mt-5 caption-top mx-auto"
      style={{ maxWidth: 650 }}
    >
      <caption>
        Click on a student to view additional details.{" "}
        <button
          style={{ verticalAlign: "inherit", padding: 0, cursor: "help" }}
          className="btn btn-link"
          onClick={onHelp}
        >
          help
        </button>
      </caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Absent</th>
          <th scope="col">Incomplete</th>
          <th scope="col">Not Submitted</th>
          <th scope="col">Missed HW</th>
          <th scope="col">Ungraded</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentTableRow
            key={student.id}
            student={student}
            onSelectStudent={onSelectStudent}
          />
        ))}
      </tbody>
    </table>
  );
}

const totalGrades = (grades) => {
  let totalIncomplete = 0;
  let totalNotSubmitted = 0;
  let totalUngraded = 0;
  grades
    .filter(
      (grade) => Date.parse(grade.assignment.effectiveDueDate) < Date.now()
    )
    .forEach((grade) => {
      if (grade.status === "graded" && grade.mark !== "I") {
        return;
      }
      if (grade.mark === "I") {
        totalIncomplete += 1;
        return;
      }
      if (grade.status === "not_submitted") {
        totalNotSubmitted += 1;
        return;
      }
      totalUngraded += 1;
    });
  const totalMissedHW = totalIncomplete + totalNotSubmitted;
  return { totalIncomplete, totalNotSubmitted, totalUngraded, totalMissedHW };
};

function StudentTableRow({ student, onSelectStudent }) {
  const { firstName, lastName, totalAbsent } = student;
  const { totalIncomplete, totalNotSubmitted, totalUngraded, totalMissedHW } =
    totalGrades(student.grades);

  let trClassName = "";
  if (totalAbsent > MAX_ABSENCES || totalMissedHW > 2) {
    trClassName = "table-danger";
  } else if (totalAbsent > MAX_ABSENCES - 1 || totalMissedHW > 1) {
    trClassName = "table-warning";
  }

  return (
    <tr className={trClassName} onClick={() => onSelectStudent(student)}>
      <td>
        {firstName} {lastName}
      </td>
      <td>{totalAbsent}</td>
      <td>{totalIncomplete}</td>
      <td>{totalNotSubmitted}</td>
      <td>{totalMissedHW}</td>
      <td>{totalUngraded}</td>
    </tr>
  );
}

export default Overview;
