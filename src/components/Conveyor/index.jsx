import React from 'react';

const Conveyor = ({ length, backgroundColor, x,y, rotation, num, origin }) => {
  return (
    <div
      style={{
        width: `${length}px`,
        height: '20px', // 可根据需要修改高度
        backgroundColor: backgroundColor,
        position: 'absolute',
        left: `${x+120}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: `${origin || 'top left'}`, // 指定旋转的原点为左上角
        textAlign:'center',
        color: 'white '
      }}
    >{num}</div>
  );
};

export default Conveyor;