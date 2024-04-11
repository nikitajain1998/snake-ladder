import React from 'react';
import './player.css'
import CircleWithTextSVG from '../spinner/circle.jsx'


const Player =(props) =>{
    return (
        <div className="disc" style = {{left:props.leftPosition, bottom:props.bottomPosition, marginLeft:props.margin}}>
            <CircleWithTextSVG />
        </div>
    );
}

export default Player