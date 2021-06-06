import PropTypes from "prop-types";

const dateFormatter = new Intl.DateTimeFormat("default", {
  month: "short",
  day: "numeric",
});

const dateParts = (date) =>
  dateFormatter
    .formatToParts(date)
    .reduce((parts, { type, value }) => ({ ...parts, [type]: value }), {});

function Calendar({ date, title }) {
  const { month, day } = dateParts(date);

  return (
    <div
      className="d-flex flex-column text-center border"
      title={title}
      style={{ width: "3.4rem" }}
    >
      <div className="bg-primary text-white fs-6">{month}</div>
      <div className="py-1 fs-4 fw-bold bg-light">{day}</div>
    </div>
  );
}

Calendar.defaultProps = { date: Date.now() };

Calendar.propTypes = { date: PropTypes.number, title: PropTypes.string };

export default Calendar;
