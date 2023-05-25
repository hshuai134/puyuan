import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import { Router } from './router';


function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
