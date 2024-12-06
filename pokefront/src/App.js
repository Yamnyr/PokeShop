import React from 'react';
import Wrapper from './Components/Wrapper';
// import PlayerManagement from './Components/PlayerManagement';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
// import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Cards from './Pages/Cards';
import CardDetail from "./Pages/CardDetail";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/cards" element={<Cards />} />
            <Route path="/card/:id" element={<CardDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;