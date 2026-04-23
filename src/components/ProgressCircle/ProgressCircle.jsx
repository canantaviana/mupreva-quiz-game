const ProgressCircle = ({ count, total }) => {
  const radius = 12.5;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="timer">
      <svg width="30" height="30" viewBox="0 0 30 30" className="is-block">
        <circle cx="15" cy="15" r="12.5" fill="none" strokeWidth="5" />
        <circle
          id="progress-circle"
          cx="15"
          cy="15"
          r="12.5"
          fill="none"
          strokeWidth="5"
          transform="rotate(-90 15 15)"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference * (1 - count / total),
            stroke: count > 5 ? "#b292b8" : "red",
          }}
        />
      </svg>
    </div>
  );
};

export default ProgressCircle;
