import { Wheel } from "react-custom-roulette";
import '../GameView/View.css';
const data = [
  { option: "1" },
  { option: "2" },
  { option: "3" },
  { option: "4" },
  { option: "5" },
  { option: "6" },
];

const WheelComponent = ({ mustSpin, prizeNumber, onStopSpinning }) => {
  //   const [mustSpin, setMustSpin] = useState(false);
  //   const [prizeNumber, setPrizeNumber] = useState(0);

  //   const handleSpinClick = () => {
  //     if (!mustSpin) {
  //       const newPrizeNumber = Math.floor(Math.random() * data.length);
  //       setPrizeNumber(newPrizeNumber);
  //       setMustSpin(true);
  //     }
  //   };

  return (
    <>
      <Wheel
        className="wheel"
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={onStopSpinning}
        spinDuration="0.01"
      />
      {/* <button onClick={handleSpinClick}>SPIN</button>
      {prizeNumber} */}
    </>
  );
};

export default WheelComponent;
