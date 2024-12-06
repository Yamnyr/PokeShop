import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { cardService } from "../Services/cardsApi";

const Cards = () => {
  const [cards, setCards] = useState([]); // Initialisation vide
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await cardService.fetchCards();
      setCards(response.cards); // On utilise uniquement la propriété "cards" de la réponse
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
      {!isLoading && cards.length === 0 && <p>No cards available.</p>}
      {cards.length > 0 &&
        cards.map((card) => <Card key={card.id} card={card} />)}
    </div>
  );
};

export default Cards;
