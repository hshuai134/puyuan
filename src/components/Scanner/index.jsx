import React from 'react';

const Scaner = ({ length, color , backgroundColor, x,y, rotation, num, vertical=false }) => {
  return (
    <div
      style={{
        width: `${(vertical && '20px') || '20px'}`,
        height: `${(vertical && '20px') || '20px'}`,
        border: `5px solid ${color || '#00d70f'}`,
        position: 'absolute',
        left: `${x+130}px`,
        top: `${y}px`,
        zIndex: 999,
        // transform: `rotate(${rotation}deg)`,
        // transformOrigin: `${origin || 'top left'}`, // 指定旋转的原点为左上角
        textAlign:'center',
        lineHeight: `${(vertical && '40px') || '20px'}`,
        // color: 'yellow'
      }}
    >{num}</div>
  );
};

export default Scaner;