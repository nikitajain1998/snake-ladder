import { Wheel } from "react-custom-roulette";

const data = [
  { option: "1" },
  { option: "2" },
  { option: "3" },
  { option: "4" },
  { option: "5" },
  { option: "6" },
];

const WheelComponent = ({ mustSpin, prizeNumber, onStopSpinning }) => {
  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={onStopSpinning}
        startingOptionIndex={0}
      />
    </>
  );
};

export default WheelComponent;
