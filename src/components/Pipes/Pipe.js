import React from 'react';
import './Pipe.css';

const Pipe = ({ orientation, position ,color, height, width, top, left}) => {
  const pipeClasses = `pipe pipe-${orientation} pipe-${color}`;
  const pipeStyle = {
    // Calculate the position and length of the pipe
    gridColumnStart: position.col,
    gridRowStart: position.row,
    height: height,
    width: width,
    top: top,
    left: left,
    // gridColumnEnd: orientation === 'horizontal' ? `span ${length}` : undefined,
    // gridRowEnd: orientation === 'vertical' ? `span ${length}` : undefined,
  };
  return <div className={pipeClasses} style={pipeStyle}></div>;
};

export default Pipe;
