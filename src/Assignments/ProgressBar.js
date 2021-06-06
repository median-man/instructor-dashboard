import PropTypes from "prop-types";
import { classNamesFromArray } from "../util";

function ProgressBar({ value, min, max }) {
  const ratio = value / (max - min);
  const width = `${Math.floor(ratio * 100)}%`;
  const variant =
    ratio < 0.7
      ? "danger"
      : ratio < 0.9
      ? "warning"
      : ratio < 1
      ? "info"
      : "success";
  return (
    <div className="progress" style={{ height: "0.25em" }}>
      <div
        className={classNamesFromArray([
          "progress-bar",
          variant && `bg-${variant}`,
        ])}
        role="progressbar"
        style={{ width }}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      ></div>
    </div>
  );
}

ProgressBar.defaultProps = {
  min: 0,
  max: 100,
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default ProgressBar;
