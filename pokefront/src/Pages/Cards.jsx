import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { cardService } from "../Services/cardsApi";

const Cards = () => {
  const [cards, setCards] = useState([{}]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await cardService.fetchCards();
      setCards(response);
    } catch (error) {
      setError(error.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <h1>Cards</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {cards.length > 0
        ? cards.map((card) => <Card key={card.id} card={card} />)
        : !isLoading && <p>No cards available.</p>}
    </div>
  );
};

export default Cards;
