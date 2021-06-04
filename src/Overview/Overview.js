import formatDate from "@bitty/format-date";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCohort, useStudents } from "../bcs";
import { classNamesFromArray, compactArray, useDocumentMeta } from "../util";
import Loader from "../common/Loader";
import OffCanvas from "./OffCanvas";
import Table from "./StudentTable";

const MAX_ABSENCES = 5;

const pageTitle = (cohortName) =>
  cohortName ? `Overview: ${cohortName}` : "Overview";

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

function Overview() {
  const { enrollmentId } = useParams();
  const [offCanvasState, setOffCanvasState] = useState({
    show: false,
    title: "",
    children: null,
  });
  const cohort = useCohort({ enrollmentId: parseInt(enrollmentId) });
  useDocumentMeta({ title: pageTitle(cohort.result?.name) });

  const students = useStudents(enrollmentId);

  useEffect(() => cohort.load(), [cohort]);

  useEffect(() => {
    students.load();
  }, [students]);

  if (students.error) {
    return <p>{students.error}</p>;
  }
  if (students.pending || !students.isLoaded) {
    return <Loader>Loading student data...</Loader>;
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

  const handleSelectStudent = (studentId) => {
    const student = students.result.get(studentId);
    setOffCanvasState({
      show: true,
      title: `${student.firstName} ${student.lastName}`,
      children: <StudentDetails student={student} />,
    });
  };

  return (
    <>
      <Table
        onHelp={handleHelp}
        onSelectStudent={handleSelectStudent}
        students={Array.from(students.result.values()).map((student) => {
          const { firstName, lastName, totalAbsent, id } = student;
          const name = `${firstName} ${lastName}`;
          const {
            totalIncomplete,
            totalNotSubmitted,
            totalUngraded,
            totalMissedHW,
          } = totalGrades(student.grades);

          let status;
          if (totalAbsent > MAX_ABSENCES || totalMissedHW > 2) {
            status = "incomplete";
          } else if (totalAbsent > MAX_ABSENCES - 1 || totalMissedHW > 1) {
            status = "warning";
          } else {
            status = "ok";
          }

          return {
            id,
            name,
            totalAbsent,
            totalIncomplete,
            totalNotSubmitted,
            totalUngraded,
            totalMissedHW,
            status,
          };
        })}
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

export default Overview;
