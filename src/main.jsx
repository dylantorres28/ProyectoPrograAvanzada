import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx' ;
import LogIn from './Components/LogIn.jsx'
import './index.css'
import { BrowserRouter as Router} from 'react-router-dom';
import Routers from './Routes/Routers.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Routers />
    </Router>
)


