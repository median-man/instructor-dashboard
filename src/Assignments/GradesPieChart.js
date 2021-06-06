// const colorMap = {
//   a: "#198754",
//   b: "#0dcaf0",
//   c: "#6c757d",
//   d: "#ffc107",
//   f: "#dc3545"
// };

// const colorStop = ({ color, value, max }) =>
//   `#${color} ${(value / max) * 360}deg`;

const colorConfig = {
  a: "#198754",
  b: "#198754",
  c: "#ffc107",
  d: "#dc3545",
  f: "#dc3545",
  incomplete: "#495057",
};

const colorTransitions = ({ grades, total }) => {
  let current = grades.a;
  const result = [`${colorConfig.a} ${(current / total) * 360}deg`];
  ["b", "c", "d", "f"].forEach((letter) => {
    current += grades[letter];
    result.push(`${colorConfig[letter]} 0 ${(current / total) * 360}deg`);
  });
  result.push(`${colorConfig.incomplete} 0`);
  return result;
};

function GradesPieChart({ grades, total }) {
  return (
    <div
      className="shadow border border-2"
      style={{
        display: "inline-block",
        width: "5em",
        height: "5em",
        borderRadius: "50%",
        backgroundImage: `conic-gradient(${colorTransitions({
          grades,
          total,
        }).join(",")})`,
      }}
    >
      <table className="visually-hidden">
        <caption>Distribution of letter grades</caption>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A/B</td>
            <td>{Math.floor(((grades.a + grades.b) / total) * 100)} %</td>
          </tr>
          <tr>
            <td>C</td>
            <td>{Math.floor((grades.c / total) * 100)} %</td>
          </tr>
          <tr>
            <td>D/F</td>
            <td>{Math.floor(((grades.d + grades.f) / total) * 100)} %</td>
          </tr>
          <tr>
            <td>Incomplete</td>
            <td>
              {Math.floor(
                ((total - Object.values(grades).reduce((a, b) => a + b)) /
                  total) *
                  100
              )}{" "}
              %
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GradesPieChart;
