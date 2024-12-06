import React, { useEffect, useState } from "react";
import { cardService } from "../Services/cardsApi";
import PokemonCard from "../Components/Card";
import "./Cards.css";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]); // État pour les types
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({}); // Gère les filtres appliqués
  const [maxPrice, setMaxPrice] = useState(1000);

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
    setMaxPrice(1000);
  };

  // Fonction pour mettre à jour la valeur du slider et appliquer le filtre
  const handlePriceChange = (e) => {
    const newMaxPrice = e.target.value;
    setMaxPrice(newMaxPrice);
    setFilters((prevFilters) => ({ ...prevFilters, maxPrice: newMaxPrice }));
  };

  // Fonction qui s'active lorsqu'on relâche le curseur et lance la recherche
  const handlePriceChangeEnd = async (e) => {
    const newMaxPrice = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, maxPrice: newMaxPrice }));
  };

  return (
    <div>
      <div className="title-clearButton">
        <h1>Cards</h1>

        <button className="clear" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="price-filter">
        <label htmlFor="priceRange">
          Prix maximum: {maxPrice}€{maxPrice == 1000 && <span> et +</span>}
        </label>
        <input
          type="range"
          id="priceRange"
          min="0"
          max="1000" // Valeur maximale du slider
          step="10"
          value={maxPrice}
          onChange={handlePriceChange} // Met à jour la valeur du prix pendant que le curseur est déplacé
          onMouseUp={handlePriceChangeEnd} // Applique le filtre lorsque le curseur est relâché
        />
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
          </button>
        ))}
      </div>

      {/* Affichage des cartes */}
      <div className="cards-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {/* Ajout d'une transition pour éviter le clignotement */}
        <div className={`cards-list ${isLoading ? "loading" : ""}`}>
          {cards.length === 0 && !isLoading && <p>No cards available.</p>}
          {cards.length > 0 &&
            cards.map((card) => <PokemonCard key={card._id} card={card} />)}
        </div>
      </div>
    </div>
  );
};

export default Cards;
