import React, { useState, useEffect } from 'react';

function Draggable(props) {
  const [position1, setPosition1] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState(false);
  const { children } = props;

  useEffect(() => {
    function handleMouseMove(event) {
      if (isDragging) {
        const { pageX, pageY, } = event;
        const offsetX = pageX - position1.x;
        const offsetY = pageY - position1.y;
        if (offsetX < 4500 && offsetY < 3000){
          setPosition({ x: offsetX, y: offsetY });
          setPosition1({ x: offsetX, y: offsetY });
        }
      }
    }

    function handleMouseUp(event) {
      setDragging(false);
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging]);

  function handleMouseDown(event) {
    const { pageX, pageY } = event;
    setPosition1(prev => { return { x: pageX - prev.x, y: pageY - prev.y } });
    setDragging(true);
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'move',
        marginLeft: '100px'
      }}
    >
      {children}
    </div>
  );
}

export default Draggable