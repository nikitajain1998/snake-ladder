import { useState } from "react";
// import './Spinner.css'; // Ensure this file exists in your project and contains the necessary styles

const Wheel = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);

  const spinWheel = () => {
    setSelectedNumber(0);

    setTimeout(() => {
      const targetSegment = Math.floor(Math.random() * 6) + 1;
      setSelectedNumber(targetSegment);

      const sectionDegree = 360 / 6; // 60 degrees for each segment
      const targetCenterAngle =
        (targetSegment - 1) * sectionDegree + sectionDegree / 2;

      const additionalRotations = 720;

      const finalRotation = additionalRotations + targetCenterAngle;

      setRotation(finalRotation);
    }, 0);
  };

  const getLabelPosition = (index) => {
    const radius = 100;
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 150 + radius * Math.sin(angle),
    };
  };

  return (
    <div className="wheel-container">
      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 5s ease-out",
        }}
      >
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Circle Outline - Removed for no border */}
          {Array.from({ length: 1 }).map((_, index) => {
            const labelPosition = getLabelPosition(index + 0.5);
            return (
              <g key={index}>
                <path
                  d={`M150,150 L${
                    150 + 140 * Math.cos((Math.PI * (-90 + index * 60)) / 180)
                  },${
                    150 + 140 * Math.sin((Math.PI * (-90 + index * 60)) / 180)
                  } A140,140 0 0,1 ${
                    150 +
                    140 * Math.cos((Math.PI * (-90 + (index + 1) * 60)) / 180)
                  },${
                    150 +
                    140 * Math.sin((Math.PI * (-90 + (index + 1) * 60)) / 180)
                  } Z`}
                  fill="black"
                  stroke="white"
                  strokeWidth="1"
                />
                <text
                  x={labelPosition.x}
                  y={labelPosition.y}
                  textAnchor="middle"
                  fill="white"
                  fontSize="20"
                  alignmentBaseline="middle"
                >
                  {index + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="spinner"></div>
      <button onClick={spinWheel} className="spin-button">
        Spin
      </button>
      {selectedNumber && <p className="result">Stopped on: {selectedNumber}</p>}
    </div>
  );
};

export default Wheel;
