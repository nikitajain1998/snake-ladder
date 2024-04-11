import React from 'react';
import './Board.css';
import Pipe from '../Pipes/Pipe';


const Square = ({ number, isPipeTop, isPipeBottom }) => {
    const size = 10; 
    const row = Math.ceil(number / 10); 
    const isEvenRow = row % 2 === 0;
    const isLeftCol = number % 1 === 1;
    const isRightCol = number % 1 === 0 || number === 1;
    const isTopRow = row === 10;
    const isBottomRow = row === 1; 
   
    
    let direction = (row % 2 === 0) ? 'right' : 'left';
    if(number % 10 === 0){
    direction = 'top';
    }
    const triangleClassName = `triangle triangle-${direction}`;
    const borderClasses = `
    ${isTopRow ? 'border-top' : ''}
    ${isBottomRow ? 'border-bottom' : ''}
    ${isLeftCol ? 'border-left' : ''}
    ${isRightCol ? 'border-right' : ''}
    `;
    const squareClasses = `square ${borderClasses} ${isPipeTop ? 'pipe-top' : ''} ${isPipeBottom ? 'pipe-bottom' : ''}`;

   return (
     <div className={squareClasses}>
       <span className= "number">{number}</span>
       <span className={triangleClassName}></span> 
     </div>
   );
 };


 const Board = () => {
   const size = 10; 
   let squares = [];
   let pipes = [];
   let ladderPipes = {
    "1": {
        "a": { orient:"horizontal-1a", position:{ row: 10, col: 1 } , height: ".5rem", width:"1.8rem", top:"1.7rem", left:"2.35rem"  },
        "b": { orient:"straight-vertical-1b", position:{ row: 8, col: 2 } , height: "9.7rem", width:".5rem" , top:"", left:"-.3rem" },
        "c": { orient:"straight-horizontal-1c", position:{ row: 8, col: 2 } , height: ".5rem", width:"5.95rem" , top:"-0.32rem", left:"-0.3rem" },
        "d": { orient:"vertical-1d", position:{ row: 7, col: 3 } , height: "1.85rem", width:".5rem" , top:"2.25rem", left:"1.7rem" },
        },
    "4":{
        "a": { orient:"horizontal-4a", position:{ row: 10, col: 4 } , height: ".5rem", width:"1.8rem", top:"1.7rem", left:"2.2rem"  },
        "b": { orient:"straight-vertical-4b", position:{ row: 9, col: 5 } , height: "6.48rem", width:".5rem" , top:"-0.35rem", left:"-.2rem" },
        "c": { orient:"straight-horizontal-4c", position:{ row: 9, col: 5 } , height: ".5rem", width:"7.8rem" , top:"-.35rem", left:"0rem" },
        "d": { orient:"straight-vertical-4d", position:{ row: 9, col: 7 } , height: "4.45rem", width:".5rem" , top:"-0.35rem", left:"-0.25rem" },
        "e": { orient:"horizontal-4e", position:{ row: 10, col: 6 } , height: ".5rem", width:"1.8rem", top:"-0.35rem", left:"4rem"  },
        "f": { orient:"vertical-4f", position:{ row: 9, col: 7 } , height: "1.85rem", width:".5rem" , top:"2.25rem", left:"1.7rem" },
        },
    "9":{
        "a": { orient:"horizontal-9a", position:{ row: 10, col: 8 } , height: ".5rem", width:"2rem", top:"1.7rem", left:"4rem"  },
        "b": { orient:"straight-vertical-9b", position:{ row: 8, col: 9 } , height: "10.06rem", width:".5rem" , top:"", left:"-.3rem" },
        "c": { orient:"straight-horizontal-9c", position:{ row: 8, col: 9 } , height: ".5rem", width:"6rem" , top:"-0.32rem", left:"-0.3rem" },
        "d": { orient:"vertical-9d", position:{ row: 7, col: 10 } , height: "1.85rem", width:".5rem" , top:"2.25rem", left:"1.7rem" },
        },
    "28":{
        "a": { orient:"horizontal-28a", position:{ row: 8, col: 7 } , height: ".5rem", width:"2rem", top:"1.7rem", left:"4rem"  },
        "f": { orient:"vertical-28f", position:{ row: 7, col: 7 } , height: "2.13rem", width:".5rem" , top:"4rem", left:"3.7rem" },
        "c": { orient:"straight-horizontal-28c", position:{ row: 8, col: 6 } , height: ".5rem", width:"8rem" , top:"-.35rem", left:"0rem" },
        "b": { orient:"straight-vertical-28b", position:{ row: 3, col: 6 } , height: "20.2rem", width:".5rem" , top:"-0.35rem", left:"-.2rem" },
        "d": { orient:"straight-horizontal-28d", position:{ row: 3, col: 5 } , height: ".5rem", width:"6.2rem" , top:"-.35rem", left:"-2.06rem" },
        "e": { orient:"horizontal-28e", position:{ row: 3, col: 4 } , height: "1.45rem", width:".5rem", top:"-1.35rem", left:"1.75rem"  },
        },
    "36":{
        "a": { orient:"horizontal-36a", position:{ row: 7, col: 5 } , height: ".5rem", width:"2rem", top:"1.7rem", left:"0rem"  },
        "b": { orient:"straight-vertical-36b", position:{ row: 7, col: 5 } , height: "2.2rem", width:".5rem" , top:"", left:"-.25rem" },
        "c": { orient:"straight-horizontal-36c", position:{ row: 7, col: 4 } , height: ".5rem", width:"2rem" , top:"-0.38rem", left:"2.05rem" },
        "d": { orient:"vertical-36d", position:{ row: 6, col: 4 } , height: "1.85rem", width:".5rem" , top:"2.2rem", left:"1.7rem" },
        },
    "40":{
        "a": { orient:"horizontal-40a", position:{ row: 7, col: 1 } , height: ".5rem", width:"2rem", top:"1.7rem", left:"2rem"  },
        "b": { orient:"straight-vertical-40b", position:{ row: 7, col: 2 } , height: "2.4rem", width:".5rem" , top:"-.35rem", left:"-.3rem" },
        "c": { orient:"straight-horizontal-40c", position:{ row: 7, col: 2 } , height: ".5rem", width:"1.8rem" , top:"-0.35rem", left:"0rem" },
        "d": { orient:"vertical-40d", position:{ row: 6, col: 2 } , height: "1.85rem", width:".5rem" , top:"2.25rem", left:"1.7rem" },
        },
    "51":{
        "a": { orient:"horizontal-51a", position:{ row: 5, col: 9 } , height: ".5rem", width:"2rem", top:"1.7rem", left:"4rem"  },
        "f": { orient:"vertical-51f", position:{ row: 4, col: 9 } , height: "2.58rem", width:".5rem" , top:"3.57rem", left:"3.7rem" },
        "c": { orient:"straight-horizontal-51c", position:{ row: 5, col: 8 } , height: ".5rem", width:"10rem" , top:"-.35rem", left:"-2rem" },
        "d": { orient:"vertical-51d", position:{ row: 4, col: 7 } , height: "1.85rem", width:".5rem" , top:"2.2rem", left:"1.7rem" },
        },
    "71":{
        "a": { orient:"horizontal-71a", position:{ row: 3, col: 9 } , height: ".5rem", width:"2rem", top:"1.7rem", left:"4rem"  },
        "c": { orient:"straight-vertical-71c", position:{ row: 2, col: 10 } , height: "6.38rem", width:".5rem" , top:"-0.24rem", left:"-.2rem" },
        "d": { orient:"vertical-71d", position:{ row: 1, col: 10 } , height: "1.85rem", width:".5rem" , top:"2.34rem", left:"1.7rem" },
        "b": { orient:"horizontal-71b", position:{ row: 1, col: 9 } , height: ".5rem", width:"2rem", top:"3.7rem", left:"4rem"  },
        },
    "80":{
        "a": { orient:"horizontal-80a", position:{ row: 3, col: 1 } , height: ".5rem", width:"2rem", top:"1.7rem", left:"2rem"  },
        "c": { orient:"straight-vertical-80c", position:{ row: 2, col: 2 } , height: "6.38rem", width:".5rem" , top:"-0.24rem", left:"-.2rem" },
        "b": { orient:"horizontal-80b", position:{ row: 1, col: 1 } , height: ".5rem", width:"2rem", top:"3.7rem", left:"2rem"  },
        "d": { orient:"vertical-80d", position:{ row: 1, col: 1 } , height: "1.95rem", width:".5rem" , top:"2.25rem", left:"1.7rem" },
        }
    }
    let snakePipes = {
        "6":{
            "d": { orient:"vertical-6d", position:{ row: 9, col: 6 } , height: "2rem", width:".5rem" , top:"3.62rem", left:"1.7rem" },
            "a": { orient:"horizontal-6a", position:{ row: 10, col: 6 } , height: ".5rem", width:"2rem", top:"-0.3rem", left:"0rem"  },
            "b": { orient:"straight-vertical-6b", position:{ row: 9, col: 6 } , height: "2.46rem", width:".5rem" , top:"1.69rem", left:"-.25rem" },
            "c": { orient:"horizontal-6c", position:{ row: 9, col: 5 } , height: ".5rem", width:"1.85rem", top:"1.7rem", left:"2.2rem"  },
            },
        "11":{
            "d": { orient:"vertical-11d", position:{ row: 8, col: 10 } , height: "2rem", width:".5rem" , top:"3.62rem", left:"1.7rem" },
            "a": { orient:"horizontal-11a", position:{ row: 9, col: 10 } , height: ".5rem", width:"2rem", top:"-0.34rem", left:"0rem"  },
            "b": { orient:"straight-vertical-11b", position:{ row: 6, col: 10 } , height: "10.06rem", width:".5rem" , top:"1.95rem", left:"-.3rem" },
            "c": { orient:"horizontal-11c", position:{ row: 6, col: 9 } , height: ".5rem", width:"1.79rem", top:"1.7rem", left:"2.45rem"  },
            },
       
        "19":{
            "d": { orient:"vertical-19d", position:{ row: 8, col: 2 } , height: "2rem", width:".5rem" , top:"3.63rem", left:"1.7rem" },
            "a": { orient:"horizontal-19a", position:{ row: 9, col: 2 } , height: ".5rem", width:"2rem", top:"-0.3rem", left:"2rem"  },
            "b": { orient:"straight-vertical-19b", position:{ row: 4, col: 3 } , height: "18.22rem", width:".5rem" , top:"1.7rem", left:"-.3rem" },
            "c": { orient:"horizontal-19c", position:{ row: 4, col: 2 } , height: ".5rem", width:"1.85rem", top:"1.7rem", left:"2.15rem"  },
            },
        "24":{
            "a": { orient:"vertical-24a", position:{ row: 7, col: 4 } , height: "2rem", width:".5rem" , top:"3.63rem", left:"1.7rem" },
            "b": { orient:"horizontal-24b", position:{ row: 8, col: 4 } , height: ".5rem", width:"2rem", top:"-0.3rem", left:"0rem"  },
            "c": { orient:"straight-vertical-24c", position:{ row: 4, col: 4 } , height: "11.97rem", width:".5rem" , top:"4rem", left:"-.3rem" },
            "d": { orient:"straight-horizontal-24d", position:{ row: 5, col: 4 } , height: ".5rem", width:"12.3rem" , top:"-.35rem", left:"-0.3rem" },
            "e": { orient:"straight-vertical-24e", position:{ row: 4, col: 7 } , height: "4.07rem", width:".5rem" , top:"-0.25rem", left:"-0.25rem" },
            "f": { orient:"horizontal-24f", position:{ row: 3, col: 6 } , height: ".5rem", width:"4.2rem", top:"3.7rem", left:"3.7rem"  },
            "g": { orient:"straight-vertical-24g", position:{ row: 2, col: 8 } , height: "6.45rem", width:".5rem" , top:"1.67rem", left:"-.2rem" },
            "h": { orient:"horizontal-24h", position:{ row: 2, col: 7 } , height: ".5rem", width:"2rem", top:"1.67rem", left:"2rem"  },
            },
        "26":{
            "a": { orient:"horizontal-26a", position:{ row: 8, col: 6 } , height: ".5rem", width:"1.85rem", top:"1.7rem", left:"2.2rem"  },
            "b": { orient:"straight-vertical-26b", position:{ row: 7, col: 7} , height: "6.38rem", width:".5rem" , top:"-0.24rem", left:"-.2rem" },
            "c": { orient:"horizontal-26c", position:{ row: 6, col: 6 } , height: ".5rem", width:"3.85rem", top:"3.7rem", left:"4rem"  },
            "d": { orient:"straight-vertical-26d", position:{ row: 6, col: 8 } , height: "2.4rem", width:".5rem" , top:"1.8rem", left:"-.25rem" },
            "e": { orient:"horizontal-26e", position:{ row: 6, col: 7 } , height: ".5rem", width:"1.85rem", top:"1.8rem", left:"2.2rem"  },
            },
        "53":{
            "a": { orient:"vertical-53a", position:{ row: 5, col: 8 } , height: "1.53rem", width:".5rem" , top:"2.62rem", left:"1.7rem" },
            "b": { orient:"straight-horizontal-53b", position:{ row: 6, col: 5 } , height: ".5rem", width:"13.6rem" , top:"-.3rem", left:"0.02rem" },
            "c": { orient:"straight-vertical-53c", position:{ row: 5, col: 5 } , height: "2.2rem", width:".5rem" , top:"1.93rem", left:"-.25rem" },
            "d": { orient:"horizontal-53d", position:{ row: 5, col: 4 } , height: ".5rem", width:"1.7rem", top:"1.7rem", left:"3.7rem"  },
            },
        "60":{
            "a": { orient:"vertical-60a", position:{ row: 4, col: 1 } , height: "2rem", width:".5rem" , top:"3.63rem", left:"1.7rem" },
            "b": { orient:"horizontal-60b", position:{ row: 5, col: 1 } , height: ".5rem", width:"2rem", top:"-0.3rem", left:"2rem"  },
            "c": { orient:"straight-vertical-60c", position:{ row: 4, col: 2 } , height: "4.48rem", width:".5rem" , top:"-0.35rem", left:"-0.25rem" },
            "d": { orient:"straight-horizontal-60d", position:{ row: 4, col: 2 } , height: ".5rem", width:"7.87rem" , top:"-.35rem", left:"0rem" },
            "e": { orient:"straight-vertical-60e", position:{ row: 4, col: 4 } , height: "2.55rem", width:".5rem" , top:"-6.5px", left:"-.25rem" },
            "f": { orient:"horizontal-60f", position:{ row: 4, col: 4 } , height: ".5rem", width:"2rem", top:"1.7rem", left:"0rem"  },
            },
        "73":{
            "a": { orient:"vertical-73a", position:{ row: 2, col: 8 } , height: "2rem", width:".5rem" , top:"3.63rem", left:"1.7rem" },
            "b": { orient:"horizontal-73b", position:{ row: 3, col: 8 } , height: ".5rem", width:"2rem", top:"-0.3rem", left:"2rem"  },
            "c": { orient:"straight-vertical-73c", position:{ row: 1, col: 9 } , height: "6.4rem", width:".5rem" , top:"1.67rem", left:"-.2rem" },
            "d": { orient:"horizontal-73d", position:{ row: 1, col: 8 } , height: ".5rem", width:"2rem", top:"1.67rem", left:"2rem"  },
        },
        "75":{
            "a": { orient:"vertical-75a", position:{ row: 2, col: 6 } , height: "2rem", width:".5rem" , top:"3.63rem", left:"1.7rem" },
            "b": { orient:"horizontal-75b", position:{ row: 3, col: 6 } , height: ".5rem", width:"2rem", top:"-0.3rem", left:"2rem"  },
            "c": { orient:"straight-vertical-75c", position:{ row: 1, col: 7 } , height: "6.4rem", width:".5rem" , top:"1.67rem", left:"-.2rem" },
            "d": { orient:"horizontal-75d", position:{ row: 1, col: 6 } , height: ".5rem", width:"2rem", top:"1.67rem", left:"2rem"  },
        },
        "78":{
            "a": { orient:"vertical-78a", position:{ row: 2, col: 3 } , height: "2rem", width:".5rem" , top:"3.63rem", left:"1.7rem" },
            "b": { orient:"horizontal-78b", position:{ row: 3, col: 3 } , height: ".5rem", width:"2rem", top:"-0.3rem", left:"0rem"  },
            "c": { orient:"straight-vertical-78c", position:{ row: 1, col: 3 } , height: "6.4rem", width:".5rem" , top:"1.67rem", left:"-.2rem" },
            "d": { orient:"horizontal-78d", position:{ row: 1, col: 3 } , height: ".5rem", width:"2rem", top:"1.67rem", left:"0rem"  },
        },
    }
 
    Object.entries(snakePipes).map(x=>{Object.entries(x[1]).map(y=>
        pipes.push( <Pipe 
        key={y[1].orient}
        orientation={y[1].orient}
        position={y[1].position}
        height={y[1].height}
        width={y[1].width}
        top={y[1].top}
        left={y[1].left}
        color="red"
        />)
    )
    })
    Object.entries(ladderPipes).map(x=>{Object.entries(x[1]).map(y=>
        pipes.push( <Pipe 
        key={y[1].orient}
        orientation={y[1].orient}
        position={y[1].position}
        height={y[1].height}
        width={y[1].width}
        top={y[1].top}
        left={y[1].left}
        color="green"
        />)
    )
    })
 

    for (let row = size; row > 0; row--) {
     for (let col = 1; col <= size; col++) {
       let number = (row - 1) * size + ((row % 2 !== 0) ? col : size + 1 - col);
       squares.push(<Square key={number} number={number} />);
     }
   }

    return <div className="board">
        {squares} {pipes}
        </div>;
 };
  export default Board;

