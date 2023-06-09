import { useEffect, useState } from 'react'
import Path from '../../components/Path'
import Scanner from '../../components/Scanner'
import { errPosition } from './errPosition'
import { scaners } from './scaners'
import './index.less'

const SecondGloor = ({ flag, errData = [], path = [] }) => {

  const [showErrPath, setShowErrPath] = useState([])
  const [showErrScaner, setShowErrScaner] = useState([])
  const [myPath, setMyPath] = useState([])

  useEffect(() => {
    let errPath = errPosition.filter((item, i) => {
      let flag = false
      for (const err of errData) {
        if (item.equiNum.includes(parseInt(err.errorPosition))) {
          item.errorText = err.errorText
          item.errorPosition = err.errorPosition

          //一条路线多个错误
          const intersection = item.equiNum.filter(value => errData.map(p => parseInt(p.errorPosition)).includes(value));
          item.errorPositions = intersection

          flag = true
          break;
        }
      }
      return flag
    })
    setShowErrPath(errPath)
    console.log('errPath',errPath);
    let errScaner = scaners.filter((item, i) => {
      let flag = false
      for (const err of errData) {
        if (item.num === parseInt(err.errorPosition)) {
          item.errorText = err.errorText
          item.errorPosition = err.errorPosition
          flag = true
          break;
        }
      }
      return flag
    })
    setShowErrScaner(errScaner)
  }, [errData])

  useEffect(() => {
    let Path = errPosition.filter((item, i) => {
      let flag = false
      for (const num of path) {
        if (item.num === num) {
          flag = true
          break;
        }
      }
      return flag
    })
    setMyPath(Path)
  }, [path])

  return (
    <div className='second_gloor'>
      <div className='img'>
        {/* scaners  showErrScaner */}
        {showErrScaner.map((item, i) => {
          return <Scanner flag={flag} option={item} i={i + 1} key={item.x + item.num} />
        })}
      </div>
      {showErrPath.map((item, i) => {
        return <Path item={item} flag={flag} x={3640} y={-200} key={i} isErr={true} />
      })}
      {myPath.map((item, i) => {
        return <Path item={item} flag={flag} x={3640} y={-200} key={item.num} isErr={false} />
      })}
    </div>
  )
}

export default SecondGloor