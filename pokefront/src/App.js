import React from 'react';
import Wrapper from './Components/Wrapper';
// import PlayerManagement from './Components/PlayerManagement';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Cards from "./Pages/Cards";
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
              <Route path="/home" element={<Home />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/card/:id" element={<CardDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </div>
  );
}


const App = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
      fetch(`/getall?page=${currentPage}&limit=30`)
          .then((res) => res.json())
          .then((data) => setCards(data))
          .catch((error) => console.error(error));
  }, [currentPage]);

  const handleNextPage = () => {
      setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
      <div className="app-container">
          <div className="cards-container">
              {cards.map((card) => (
                  <PokemonCard
                      key={card._id}
                      imageUrl={card.image}
                      name={card.name}
                      type={card.type.name}
                      hp={card.hp}
                      attack={card.attack}
                      defense={card.defense}
                  />
              ))}
          </div>
          <div className="pagination-controls">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
              </button>
              <button onClick={handleNextPage}>Next</button>
          </div>
      </div>
  );
};

export default App;