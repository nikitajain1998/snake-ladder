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

 
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const cellSize = 70; 
  const boardWidth = 10;

  const handleSpinClick = () => {
    let audio = new Audio("spin.mp3");
    audio.volume = 0.1; 
    audio.play(); 
    if (!mustSpin) {
      const prizeNumber = Math.floor(Math.random() * 5) +1; 
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
    const [top, left] = calculatePosition(player[turn].status);
    setLeftPosition(left);
    setTopPosition(top);
  
    const obstacleFound = checkObstacle(player[turn].status);
    if (obstacleFound) {
      player[turn].status = obstacleFound.newPosition;
      await sleep(500);
      const sound = obstacleFound.type === 'snake' ? 'snake.mp3' : 'ladder.mp3';
      new Audio(sound).play();
    }
  
    const [updatedTop, updatedLeft] = calculatePosition(player[turn].status);
  
    setLeftPosition(updatedLeft);
    setTopPosition(updatedTop);
  };
  
  const calculatePosition = (status) => {
    const top = calculateTop(status);
    const left = calculateLeft(status);
    return [top, left];
  };
  
  const checkObstacle = (status) => {
    const snakeFound = checkSnake(status);
    if (snakeFound) {
      return { type: 'snake', newPosition: snakeFound.tail };
    }
  
    const ladderFound = checkLadder(status);
    if (ladderFound) {
      return { type: 'ladder', newPosition: ladderFound.to };
    }
  
    return null;
  
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
