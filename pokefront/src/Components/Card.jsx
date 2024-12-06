import React, { useState, useRef, useEffect } from 'react';
import './PokemonCard.css';

const PokemonCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [cardStyle, setCardStyle] = useState({});
    const cardRef = useRef(null);

    // URL de l'image
    const imageUrl = "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_219.png";

    const handleCardClick = () => {
        if (!isExpanded) {
            // Calculez la position actuelle de la carte
            const rect = cardRef.current.getBoundingClientRect();
            setCardStyle({
                position: 'fixed',
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            });

            // Déclenchez l'animation d'expansion
            setTimeout(() => {
                setCardStyle({
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: '300px',
                    height: '400px',
                    transform: 'translate(-50%, -50%)',
                });
                setIsExpanded(true);
            }, 0);
        } else {
            // Retournez à la position d'origine
            const rect = cardRef.current.getBoundingClientRect();
            setCardStyle({
                position: 'fixed',
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            });

            setTimeout(() => {
                setCardStyle({});
                setIsExpanded(false);
            }, 300); // Correspond à la durée de l'animation
        }
    };

    return (
        <div>
            {/* Overlay affichée uniquement si la carte est agrandie */}
            {isExpanded && <div className="page-overlay" onClick={handleCardClick}></div>}

            <div
                className="pokemon-card"
                ref={cardRef}
                style={cardStyle}
                onClick={handleCardClick}
            >
                {/* Conteneur de la carte avec rotation */}
                <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                    {/* Face avant de la carte */}
                    <div
                        className="card-front"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        onMouseEnter={() => setIsFlipped(true)}
                        onMouseLeave={() => setIsFlipped(false)}
                    />
                    {/* Face arrière de la carte */}
                    <div className="card-back">
                        <h2>Pikachu</h2>
                        <div className="pokemon-details">
                            <p>Type: Electric</p>
                            <p>PV: 50</p>
                            <p>Attaque: 55</p>
                            <p>Défense: 40</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
