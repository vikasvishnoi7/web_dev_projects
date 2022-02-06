import React from 'react';
import { Routes, Route, BrowserRouter as Router,Navigate} from "react-router-dom"

import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import SingleItem from "./components/SingleItem/SingleItem";


function App() {
  return (
    <Router> 
      <div className='app'>

        <Navbar></Navbar>

        <Routes>
          <Route path = "/" element = {<Products />} />  
          <Route path = "/cart" element = {<Cart />} />  
          <Route path="/product/:id" element={<SingleItem />} />
        </Routes>
        
      </div>
    </Router>
  )
}



export default App;
