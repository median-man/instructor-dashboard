import { useEffect } from "react";
import { useParams } from "react-router";
import { useStudents } from "../bcs";

const MAX_ABSENCES = 5;

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
  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Absent</th>
          <th scope="col">Incomplete</th>
          <th scope="col">Not Submitted</th>
          <th scope="col">Total Missed HW</th>
          <th scope="col">Total Ungraded</th>
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

function StudentTableRow({ student }) {
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
    <tr className={trClassName}>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{totalAbsent}</td>
      <td>{totalIncomplete}</td>
      <td>{totalNotSubmitted}</td>
      <td>{totalMissedHW}</td>
      <td>{totalUngraded}</td>
    </tr>
  );
}

export default Overview;
