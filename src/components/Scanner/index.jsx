import React from 'react';
import './index.less'

const Scaner = ({ option, i, flag }) => {
  return (
    <div
      className={`${!flag ? 'normal err' : 'normal'}`}
      style={{
        position: 'absolute',
        left: `${option.x}px`,
        top: `${option.y}px`,
        zIndex: 999,
      }}
    >{i}
      <p
        style={{
          // display: `${option.err ? '' : 'none'}`,
          position: 'absolute',
          top: `${option.textY}px`,
          left: `${option.textX}px`,
          color: 'red',
          fontSize: '60px',
          fontWeight: 700,
          zIndex: 999,
          width: 'max-content'
        }}>
        {`【${option.num}】  ${option.errorText || '未知错误'}`}
      </p>
    </div>
  );
};

export default Scaner;