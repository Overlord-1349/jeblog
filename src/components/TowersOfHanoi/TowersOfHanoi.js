import React from 'react';
const Disk = (props) => {
    return <React.Fragment>
        <rect x={Math.round((240-props.size)/2)} y={props.y} rx="10" ry="10" width={props.size} height="17"
            style={{"fill":props.color, "stroke":"black", "strokeWidth":3, "opacity":"0.9"}} />
    </React.Fragment>
}

const tower = props => {
    return <svg height="220" width="250">
        <line x1="120" y1="0" x2="120" y2="210" 
        style={{"stroke":"brown","strokeWidth":"10", "opacity":"0.3" }} />
        {props.children}
    </svg>
}

export default tower;
export {Disk};
/*
<ellipse cx="125" cy={props.y} rx={props.size} ry="20" style={{"fill":props.color}}>
        </ellipse>
*/