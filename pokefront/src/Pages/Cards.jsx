import React, { useEffect, useState } from "react";
import { cardService } from "../Services/cardsApi";
import PokemonCard from "../Components/Card";
import card from "../Components/Card";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await cardService.fetchCards();
      setCards(response.cards);
    } catch (error) {
      setError(error.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);
  console.log(cards)
  return (
      <div>
        <h1>Cards</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && cards.length === 0 && <p>No cards available.</p>}
        {cards.length > 0 &&
            cards.map((card) => <PokemonCard key={card._id} card={card} />)}
      </div>
  );
};

export default Cards;
