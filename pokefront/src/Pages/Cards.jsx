import React, { useEffect, useState } from "react";
import { cardService } from "../Services/cardsApi";
import PokemonCard from "../Components/Card";
import "./Cards.css";
import { MoveRight,MoveLeft ,RefreshCcw } from "lucide-react";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [maxPrice, setMaxPrice] = useState(1000);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  // Fonction pour récupérer les cartes avec les filtres et pagination
  const getCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Inclure la page courante dans les filtres
      const response = await cardService.fetchCards({
        ...filters,
        page: currentPage,
        limit: 10  // Nombre de cartes par page
      });

      setCards(response.cards);

      // Mettre à jour les informations de pagination
      setTotalPages(response.pagination.totalPages);
      setTotalCards(response.pagination.totalCards);
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
      setTypes(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des types", error);
    }
  };

  // Effect pour charger les types une seule fois lors du premier rendu
  useEffect(() => {
    getTypes();
  }, []);

  // Effect pour récupérer les cartes chaque fois que les filtres ou la page changent
  useEffect(() => {
    getCards();
  }, [filters, currentPage]);

  // Fonction pour gérer le changement de filtre
  const handleFilterChange = (typeId) => {
    // Réinitialiser à la première page quand un nouveau filtre est appliqué
    setCurrentPage(1);
    setFilters({ typeId });
  };

  // Fonction pour réinitialiser les filtres
  const handleClearFilters = () => {
    setFilters({});
    setMaxPrice(1000);
    setCurrentPage(1);
  };

  // Fonction pour mettre à jour la valeur du slider et appliquer le filtre
  const handlePriceChange = (e) => {
    const newMaxPrice = e.target.value;
    setMaxPrice(newMaxPrice);
    setFilters((prevFilters) => ({ ...prevFilters, maxPrice: newMaxPrice }));
    setCurrentPage(1);
  };

  // Fonction de pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
      <div>
        <div className="title-clearButton">
          <h1>Cards</h1>
          <button className="clear" onClick={handleClearFilters}>
          <RefreshCcw />
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
              max="1000"
              step="10"
              value={maxPrice}
              onChange={handlePriceChange}
          />
        </div>

        {/* Barre de filtres */}
        <div className="filters">
          {types.map((type) => (
              <button
                  key={type._id}
                  className={`${filters.typeId === type._id ? "active" : ""}`}
                  onClick={() => handleFilterChange(type._id)}
              >
                <img src={type.image} alt={type.name} />
              </button>
          ))}
        </div>

        {/* Affichage des cartes */}
        <div className="cards-container">
          {error && <p>Error: {error}</p>}
          <div className={`cards-list ${isLoading ? "loading" : ""}`}>
            {cards.length === 0 && !isLoading && <p>No cards available.</p>}
            {cards.length > 0 &&
                cards.map((card) => <PokemonCard key={card._id} card={card} />)}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            {totalPages > 1 && (
                <div className="pagination-controls">
                  <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                  >
                    <MoveLeft />
                  </button>

                  {/* Page numbers */}
                  {[...Array(totalPages)].map((_, index) => (
                      <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={currentPage === index + 1 ? 'active' : ''}
                      >
                        {index + 1}
                      </button>
                  ))}

                  <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                  >
                    <MoveRight />
                  </button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Cards;