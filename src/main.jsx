import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routes/Routers.jsx';
import { UserProvider } from './Context/user.jsx';
import { CartProvider } from './Context/cart.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CartProvider>
      <Router>
        <Routers />
      </Router>
    </CartProvider>
  </UserProvider>

)


