import { React, useState } from "react";
import Board from "../Board/Board";
import { snakes, ladders, players } from "../utils/Snakes";
import Player from "../Player/player";
import "./View.css";
import Wheel from "../spinner/Wheel";
import WheelComponent from "../spinner/Wheel";

function View() {
  const [dice, setDice] = useState(0);
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [margin, setMargin] = useState("5.5rem");
  const [number, setNumber] = useState(1);
  const [spinning, setSpinning] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);

  // spinner variable
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const cellSize = 70; // Assuming each cell has a width and height of 50px
  const boardWidth = 10;

  const handleSpinClick = () => {
    if (!mustSpin) {
      const prizeNumber = Math.floor(Math.random() * 5) + 1; // Assuming 7 options as per the data array
      setPrizeNumber(prizeNumber);
      setMustSpin(true);
    }
  };

  const checkSnake = (i) => {
    const snake = snakes.slice();
    let found = snake.find((k, j) => {
      if (k.head === i) {
        return k;
      }
      return undefined;
    });
    return found;
  };

  const checkLadder = (i) => {
    const ladder = ladders.slice();
    let found = ladder.find((k, j) => {
      if (k.from === i) {
        return k;
      }
      return undefined;
    });
    return found;
  };

  const onRollDiceClick = async () => {
    setDice(prizeNumber);
    setStart(true);
    setMargin("9.3rem");
    if (gameOver) {
      return;
    }
    let player = players.slice();
    player[turn].status += prizeNumber;
    let status = player[turn].status;
    if (player[turn].status > 94) {
      const sum = player[turn].status;
      if (sum > 100) {
        player[turn].status = player[turn].status - prizeNumber;
        return;
      } else if (sum <= 100) {
        player[turn].status = sum;
        if (sum === 100) {
          new Audio("tada.mp3").play();
          setGameOver(true);
        }
      }
    }
    const top = calculateTop(player[turn].status);
    const left = calculateLeft(player[turn].status);

    setLeftPosition(left);
    setTopPosition(top);
    const snakeFound = checkSnake(player[turn].status);
    if (snakeFound !== undefined) {
      player[turn].status = snakeFound.tail;
      await sleep(500);
      new Audio("snake.mp3").play();
    }
    const ladderFound = checkLadder(player[turn].status);
    if (ladderFound !== undefined) {
      player[turn].status = ladderFound.to;
      await sleep(500);
      new Audio("ladder.mp3").play();
    }
    const updatedtop = calculateTop(player[turn].status);
    const updatedleft = calculateLeft(player[turn].status);
    console.log("top", player[turn].status);

    setLeftPosition(updatedleft);
    setTopPosition(updatedtop);
  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const calculateTop = (position) => {
    const row = Math.floor((position - 1) / boardWidth);
    const rowDirection = row % 2 === 0 ? 1 : -1;
    const top =
      Math.floor(row / 2) * cellSize * 2 + (rowDirection === 1 ? 0 : cellSize);
    return top;
  };
  const calculateLeft = (position) => {
    const col = (position - 1) % boardWidth;
    const colDirection =
      Math.floor((position - 1) / boardWidth) % 2 === 0 ? 1 : -1;
    const left =
      col * cellSize * colDirection +
      (colDirection === 1 ? 0 : (boardWidth - 1) * cellSize);
    return left;
  };

  let audio = new Audio("spin.mp3");
  audio.volume = 0.2; // Adjust the volume level between 0 and 1

  const spinWheel = () => {
    setSelectedNumber(0);

    setTimeout(() => {
      const targetSegment = Math.floor(Math.random() * 6) + 1;
      setSelectedNumber(targetSegment);
      console.log("targetSegment", targetSegment);
      // const sectionDegree = 360 / 6; // 60 degrees for each segment
      // const targetCenterAngle = (targetSegment -1) * sectionDegree - sectionDegree //(5-1)*60+30
      // console.log("targetCenterAngle",targetCenterAngle);
      // const additionalRotations = 0;

      // const finalRotation = additionalRotations + targetCenterAngle;
      // console.log(finalRotation)
      const segmentToAngle = {
        1: 180,
        2: 240,
        3: 300,
        4: 0, // or 360
        5: 60,
        6: 120,
      };

      // The angle that the spinner must reach for the selected segment
      const targetAngle = segmentToAngle[targetSegment];

      // Full rotations for a spinning effect; here it's set to at least 2 full rotations
      const fullRotationsDegrees = 360 * 2;

      // The final rotation should be the full rotations plus the target angle
      // We assume the white strip is a pointer at the top of the spinner
      const finalRotation = fullRotationsDegrees + targetAngle;

      // Normalize the final rotation so that it's within a 0 - 360 degrees range after the spin
      const normalizedRotation = (rotation + finalRotation) % 360;
      setRotation(normalizedRotation);
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
    <div className="gameView">
      <div className="spinner-div">
        <WheelComponent
          mustSpin={mustSpin}
          prizeNumber={prizeNumber - 1}
          onStopSpinning={() => {
            onRollDiceClick();
            setMustSpin(false);
          }}
        />
        <button onClick={handleSpinClick}>Spin</button>
      </div>
      <Player
        leftPosition={leftPosition}
        bottomPosition={topPosition}
        margin={margin}
      />
      <Board />
    </div>
  );
}
export default View;
