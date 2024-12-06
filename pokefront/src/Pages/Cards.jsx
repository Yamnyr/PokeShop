import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { cardService } from "../Services/cardsApi";
import "./Cards.css";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]); // État pour les types
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({}); // Gère les filtres appliqués

  // Fonction pour récupérer les cartes avec les filtres
  const getCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await cardService.fetchCards(filters); // Filtrage des cartes
      setCards(response.cards);
    } catch (error) {
      setError(error.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer les types disponibles pour les filtres
  const getTypes = async () => {
    try {
      const response = await cardService.fetchTypes();
      setTypes(response); // Stocke les types dans l'état
    } catch (error) {
      console.error("Erreur lors de la récupération des types", error);
    }
  };

  // Effect pour charger les types une seule fois lors du premier rendu
  useEffect(() => {
    getTypes();
  }, []);

  // Effect pour récupérer les cartes chaque fois que les filtres changent
  useEffect(() => {
    getCards();
  }, [filters]);

  // Fonction pour gérer le changement de filtre
  const handleFilterChange = (typeId) => {
    setFilters({ typeId }); // Applique le filtre sélectionné
  };

  // Fonction pour réinitialiser les filtres
  const handleClearFilters = () => {
    setFilters({}); // Réinitialise les filtres, ce qui montre toutes les cartes
  };

  return (
    <div>
      <div className="title-clearButton">
        <h1>Cards</h1>

        <button className="clear" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Barre de filtres */}
      <div className="filters">
        {types.map((type) => (
          <button
            key={type._id}
            className={`${filters.typeId === type._id ? "active" : ""}`} // Applique la classe active si le type est sélectionné
            onClick={() => handleFilterChange(type._id)} // Met à jour les filtres en fonction du type sélectionné
          >
            <img src={type.image} alt={type.name} />
            <span>{type.name}</span> {/* Affiche le nom du type */}
          </button>
        ))}
      </div>

      {/* Affichage des cartes */}
      <div className="cards-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && cards.length === 0 && <p>No cards available.</p>}
        {cards.length > 0 &&
          cards.map((card) => <Card key={card._id} card={card} />)}
      </div>
    </div>
  );
};

export default Cards;
