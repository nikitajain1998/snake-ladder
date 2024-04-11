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
    let audio = new Audio("spin.mp3");
    audio.volume = 0.1; 
    audio.play(); // Adjust the volume level between 0 and 1
    if (!mustSpin) {
      const prizeNumber = Math.floor(Math.random() * 5) +1; // Assuming 7 options as per the data array
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
    // setSpinning(true);
    // const roll = Math.floor(Math.random() * 6) + 1;
    // setSpinning(false);

    // if (!mustSpin) {
    // const newPrizeNumber = Math.floor(Math.random() * 7); // Assuming 7 options as per the data array
    // setPrizeNumber(newPrizeNumber);
    // setMustSpin(true);

    // console.log(newPrizeNumber);
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
