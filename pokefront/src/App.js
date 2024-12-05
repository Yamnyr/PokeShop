import React from 'react';
// import PlayerManagement from './Components/PlayerManagement';
import Wrapper from './Components/Wrapper';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import User from "./pages/User";
import AdvertisementDetail from "./pages/AdvertisementDetail";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </div>
  );
}

export default App;