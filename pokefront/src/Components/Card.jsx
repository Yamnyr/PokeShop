import React, { useState } from 'react';
import './PokemonCard.css';

const PokemonCard = ({
                         imageUrl,
                         name,
                         type,
                         hp,
                         attack,
                         defense
                     }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="pokemon-card"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            test:
            <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                <div
                    className="card-front"
                    style={{
                        backgroundImage: `url(https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_227.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                {/* Face arrière - Informations */}
                <div className="card-back">
                    <h2>{name}</h2>
                    <div className="pokemon-details">
                        <p>Type: {type}</p>
                        <p>PV: {hp}</p>
                        <p>Attaque: {attack}</p>
                        <p>Défense: {defense}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;