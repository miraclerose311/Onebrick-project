import PropTypes from "prop-types";
const ProgressCircle = ({ percent }) => {
  // circumference of the circle
  const r = 18; // radius of the circle
  const c = 2 * Math.PI * r; // circumference

  // How much should the progress bar be filled?
  const offset = ((100 - percent) / 100) * c;

  return (
    <svg
      className="rotate-[-90deg]"
      width="100%"
      height="100%"
      viewBox="0 0 40 40"
    >
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke="#FEB782"
        strokeWidth="2"
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
ProgressCircle.propTypes = {
  percent: PropTypes.number.isRequired,
};
export default ProgressCircle;
