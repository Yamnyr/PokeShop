import React, { useState, useRef } from "react";
import "./PokemonCard.css";

const PokemonCard = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [cardStyle, setCardStyle] = useState({});
    const cardRef = useRef(null);

       // Gestion du survol de la carte
       const handleMouseEnter = () => {
        
       setIsFlipped(true); 
        
    };

    const handleMouseLeave = () => {
        setIsFlipped(false); // Remettre la carte dans sa position normale
    };

    const handleCardClick = () => {
        if (!isExpanded) {
            const rect = cardRef.current.getBoundingClientRect();

            setCardStyle({
                position: "fixed",
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                transition: "all 0.8s ease-in-out",
                transform: "rotate(0deg)",
                zIndex: 1000,
            });

            setTimeout(() => {
                setCardStyle({
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    width: "250px",
                    height: "350px",
                    transform: "translate(-50%, -50%) rotate(720deg)",
                    transition: "all 0.8s ease-in-out",
                    zIndex: 1000,
                });
                setIsExpanded(true);
                setIsFlipped(true);
            }, 50);
        } else {
            const rect = cardRef.current.getBoundingClientRect();

            setCardStyle({
                position: "fixed",
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                transition: "all 0.8s ease-in-out",
                transform: "rotate(0deg)",
                zIndex: 1000,
            });

            setTimeout(() => {
                setCardStyle({
                });
                setIsExpanded(false);
                setIsFlipped(false);
            }, 800);
        }
    };

   return (
    <div>
        {isExpanded && <div className="page-overlay" onClick={handleCardClick}></div>}

        <div
            className="pokemon-card"
            ref={cardRef}
            style={cardStyle}
            onClick={handleCardClick}
            onMouseEnter={handleMouseEnter} // Quand la souris entre sur la carte
            onMouseLeave={handleMouseLeave} // Quand la souris quitte la carte
        >
            <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
                {/* Face avant de la carte */}
                <div
                    className="card-front"
                    style={{
                        backgroundImage: `url(${card.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                {/* Face arrière de la carte */}
                <div className="card-back"
                    style={{
                        backgroundImage: `url(https://img00.deviantart.net/fd26/i/2016/259/5/a/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg-dah43cy.png)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h2 className="card-name">{card.name}</h2>
                    <div className="pokemon-details">
                        <div className="pokemon-type">
                            <img
                                src={card.type.image}
                                alt={card.type.name}
                                className="type-icon"
                            />
                        </div>
                        <p className="pokemon-price">Prix: {card.price}€</p>
                        <p className="pokemon-owner">Propriétaire: {card.owner.username}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

};

export default PokemonCard;
