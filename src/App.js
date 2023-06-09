import './App.less';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import 'antd/dist/reset.css';
import SearchBox from './components/SearchBox';
import { useState } from 'react';
import { MyContext } from '../src/MyContext/index';

function App() {
  const [scanerData, setScanerData] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(0.25);

  return (
    <MyContext.Provider value={{ scanerData, setScanerData, zoomLevel, setZoomLevel}}>
      <BrowserRouter>
        <SearchBox ></SearchBox>
        <Router />
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
