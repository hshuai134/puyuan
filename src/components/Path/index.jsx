
const Path = ({ item, flag, x, y, isErr, test }) => {
  return (
    <div style={isErr ? {
      // display: `${item.err ? '' : 'none'}`,
      position: 'absolute',
      minWidth: 'auto',
      height: 'auto',
      top: `${y}px`,
      left: `${x}px`,
    } : {
      position: 'absolute',
      minWidth: 'auto',
      height: 'auto',
      top: `${y-8000}px`,
      left: `${x}px`,
    }}>
      <img
        className='imgerr'
        src={item.img}
        alt=''
        style={isErr ? {
          visibility: `${isErr && flag && !test ? 'hidden' : 'visible'}`,
        } : {
          filter: 'drop-shadow(0 8000px blue)'
        }}
      />
      <p
        style={{
          display: `${isErr ? '' : 'none'}`,
          color: 'red',
          fontSize: '60px',
          position: 'absolute',
          top: `${item.textY}px`,
          left: `${item.textX}px`,
          fontWeight: 700,
          width: 'max-content'
        }}
      >
        {`【${item.errorPositions || item.errorPosition || 160200}】  ${item.errorText || '卡箱卡箱卡箱'}`}
      </p>
    </div>
  )
}

export default Path