import React, { useEffect, useState } from 'react';
import { cardService } from '../Services/cardsApi';
import Card from '../Components/Card';
import CardModal from '../Components/Modal';

const Profile = () => {
    const [myCards, setMyCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const fetchMyCards = async () => {
            try {
                setLoading(true);
                const data = await cardService.fetchMyCards();
                setMyCards(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching my cards:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchMyCards();
    }, []);

    const handleCardEdit = (card) => {
        setSelectedCard(card);
    };

    const handleUpdateCard = (updatedCard) => {
        setMyCards(prevCards =>
            prevCards.map(card =>
                card._id === updatedCard._id ? updatedCard : card
            )
        );
    };

    const handleDeleteCard = (deletedCardId) => {
        setMyCards(prevCards =>
            prevCards.filter(card => card._id !== deletedCardId)
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading cards: {error.message}</div>;

    return (
        <div className="profile-container">
            <h1>My Cards</h1>
            {myCards.length === 0 ? (
                <p>You have no cards yet.</p>
            ) : (
                <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-4">
                    {myCards.map(card => (
                        <div key={card._id} className="relative">
                            <Card
                                card={card}
                                onEdit={() => handleCardEdit(card)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for editing/deleting card */}
            {selectedCard && (
                <CardModal
                    card={selectedCard}
                    onClose={() => setSelectedCard(null)}
                    onUpdate={handleUpdateCard}
                    onDelete={handleDeleteCard}
                />
            )}
        </div>
    );
};

export default Profile;