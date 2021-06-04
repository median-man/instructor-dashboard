import { useState } from "react";
import { ReactComponent as SortUp } from "bootstrap-icons/icons/sort-up.svg";
import { ReactComponent as SortDown } from "bootstrap-icons/icons/sort-down.svg";
import sortBy from "lodash/sortBy";

function StudentTable({ students, onSelectStudent, onHelp }) {
  return (
    <Table
      students={students}
      onSelectStudent={onSelectStudent}
      onHelp={onHelp}
    />
  );
}

function Table({ students, onSelectStudent, onHelp }) {
  const [{ sortCol, sortOrder }, setSortState] = useState({
    sortCol: "name",
    sortOrder: 1,
  });

  // _.sortBy creates a new array
  const sortedStudents = sortBy(students, sortCol);

  if (sortOrder === -1) {
    sortedStudents.reverse();
  }

  const handleToggleSort = (fieldName) => {
    setSortState((current) => ({
      sortCol: fieldName,
      sortOrder:
        // flip sort order only when fieldName is the current sortCol. Sort in
        // ASC order when the sortCol changes.
        current.sortCol === fieldName ? current.sortOrder * -1 : 1,
    }));
  };

  return (
    <table
      className="table table-sm table-hover mt-5 caption-top mx-auto"
      style={{ maxWidth: "45rem" }}
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
      <TableHeader
        sortCol={sortCol}
        sortOrder={sortOrder}
        onToggleSort={handleToggleSort}
      />
      <tbody>
        {sortedStudents.map((student) => (
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

const headingConfig = [
  {
    label: "Name",
    fieldName: "name",
  },
  {
    label: "Absent",
    fieldName: "totalAbsent",
  },
  {
    label: "Incomplete",
    fieldName: "totalIncomplete",
  },
  {
    label: "Not Submitted",
    fieldName: "totalNotSubmitted",
  },
  {
    label: "Missed HW",
    fieldName: "totalMissedHW",
  },
  {
    label: "Ungraded",
    fieldName: "totalUngraded",
  },
  {
    // Status column is for screen-readers. Color variants are used to convey
    // the status.
    label: "Status",
    fieldName: "status",
    screenReaderOnly: true,
  },
];

function TableHeader({ sortCol, sortOrder, onToggleSort }) {
  return (
    <thead>
      <tr>
        {headingConfig.map((headingProps) =>
          headingProps.screenReaderOnly ? (
            <TableHeadingVisuallyHidden
              key={headingProps.fieldName}
              {...headingProps}
            />
          ) : (
            <TableHeading
              key={headingProps.fieldName}
              sortCol={sortCol}
              sortOrder={sortOrder}
              onToggleSort={onToggleSort}
              {...headingProps}
            />
          )
        )}
      </tr>
    </thead>
  );
}

function TableHeading({ sortOrder, sortCol, label, fieldName, onToggleSort }) {
  // use null when not the actively sorted column. WAI-ARIA states that "authors
  // SHOULD apply aria-sort to only one header at a time".
  // (https://www.digitala11y.com/aria-sort-properties/)
  const ariaSort =
    sortCol !== fieldName ? null : sortOrder === 1 ? "ascending" : "descending";

  return (
    <th scope="col" aria-sort={ariaSort}>
      <span
        tabIndex={0}
        role="button"
        onClick={() => onToggleSort(fieldName)}
        onKeyUp={(e) => e.key === "Enter" && onToggleSort(fieldName)}
        style={{ cursor: "pointer" }}
      >
        {label} <SortIcon sortOrder={sortOrder} show={sortCol === fieldName} />
      </span>
    </th>
  );
}

function TableHeadingVisuallyHidden({ label }) {
  return (
    <th scope="col" className="visually-hidden">
      {label}
    </th>
  );
}

function SortIcon({ sortOrder, show }) {
  const style = { visibility: show ? "visible" : "hidden" };
  const Icon = sortOrder === 1 ? SortDown : SortUp;
  return <Icon aria-label="toggle sort" style={style} />;
}

function StudentTableRow({ student, onSelectStudent }) {
  const {
    id,
    name,
    totalAbsent,
    totalIncomplete,
    totalNotSubmitted,
    totalUngraded,
    totalMissedHW,
    status,
  } = student;

  const trClassName =
    status === "ok"
      ? ""
      : status === "incomplete"
      ? "table-danger"
      : "table-warning";

  return (
    <tr
      role="button"
      className={trClassName}
      onClick={() => onSelectStudent(id)}
      onKeyUp={(e) => e.key === "Enter" && onSelectStudent(id)}
      tabIndex={0}
    >
      <td>{name}</td>
      <td>{totalAbsent}</td>
      <td>{totalIncomplete}</td>
      <td>{totalNotSubmitted}</td>
      <td>{totalMissedHW}</td>
      <td>{totalUngraded}</td>
      {/* Status column for screen-readers only */}
      <td className="visually-hidden">{status}</td>
    </tr>
  );
}

export default StudentTable;
