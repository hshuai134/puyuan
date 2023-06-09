import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import Draggable from '../../components/Draggable';
import { scanerPath } from '../../constant/scanerPath';
import { getErrRecord, getScanerRecord } from '../../services/api';
import { useContext } from 'react';
import { MyContext } from '../../MyContext/index';
import FirstGloor from '../FirstGloor';
import FirstGloor2 from '../FirstGloor2';
import FirstGloor3 from '../FirstGloor3';
import FirstGloor4 from '../FirstGloor4';
import SecondGloor from '../SecondGloor';
import ThirdGloor from '../ThirdGloor';
import './index.less'

const Index = () => {
  const [flag, setFlag] = useState(false)
  const [errData, setErrData] = useState([]);
  const [path, setPath] = useState([])
  const { scanerData, setScanerData } = useContext(MyContext);
  const { zoomLevel, setZoomLevel } = useContext(MyContext);

  const getErrInfo = async () => {
    let res = await getErrRecord({
      pageNo: 1,
      pageSize: 40
    });
    if (res.status === 200) {
      setErrData((res.data.infos.list != null &&
        res.data.infos.list.concat([
          {errorPosition:220030, errorText: '急停'},
          {errorPosition:220010, errorText: '急停'},
          // {errorPosition:320410, errorText: '急停'}
        ])) || [
          // {errorPosition:130170, errorText: '急停'},
          // {errorPosition:171320, errorText: '急停'},
          // {errorPosition:320410, errorText: '急停'}
        ])
    } else {
      setErrData([])
    }
  }

  //监测异常路径
  const { run: start, cancel: stop } = useRequest(getErrInfo, {
    manual: true,
    pollingInterval: 5000,  //轮询
  });


  useEffect(() => {
    const zoomableElem = document.getElementById('zoomable');
    zoomableElem.style.transformOrigin = `letf top`;
    zoomableElem.style.transform = `scale(${zoomLevel})`;
    console.log(zoomLevel);
  }, [zoomLevel]);

  useEffect(() => {
    start();
    const interval = setInterval(() => {
      setFlag(prev => !prev)
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [])


  useEffect(() => {
    console.log("查询路径：",scanerData);
    let s = scanerPath.filter((item, i) => {
      let flag = false
      for (const scaner of scanerData) {
        if (item.num === parseInt(scaner.scannerNo)) {
          item.roadCode = scaner.roadCode
          flag = true
          break;
        }
      }
      return flag
    })
    console.log("s", s);
    let tempPath = s.map((item) => {
      return item[item.roadCode]
    })
    const arr1 = tempPath.flatMap(item => item);
    const result = [...new Set(arr1)];
    setPath(result)
  }, [scanerData])

  return (
    <Draggable >
      <div className="index" id="zoomable" style={{transformOrigin: 'left top'}}>
        <FirstGloor flag={flag} errData={errData} path={path} />
        <FirstGloor2 flag={flag} errData={errData} path={path} />
        <FirstGloor3 flag={flag} errData={errData} path={path} />
        <FirstGloor4 flag={flag} errData={errData} path={path} />
        <SecondGloor flag={flag} errData={errData} path={path} />
        <ThirdGloor flag={flag} errData={errData} path={path} />
      </div>
    </Draggable>
  )
}

export default Index;
