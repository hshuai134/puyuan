import { boxs } from "./boxs"
import Conveyor from "../../components/Conveyor"
import Scaner from "../../components/Scanner"
import { scaners } from "./scaners"

const config = {
  length: 200,
  backgroundColor: "#ababab",
  x: 0,
  y: 0,
  rotation: 90,
}

const Home4 = () => {
  return (
    <div className="App">
      <div className='content'>
        {boxs.map((item, i) => {
          return <Conveyor {...config} {...item} key={i} />
        })}
        {scaners.map((item, i) => {
          return <Scaner {...item} key={i} />
        })}
      </div>
    </div>
  )
}

export default Home4;
