import React from 'react';
import Wrapper from './Components/Wrapper';
// import PlayerManagement from './Components/PlayerManagement';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";

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