import React, { useEffect, useState } from 'react';
import { cardService } from '../Services/cardsApi';
import Card from '../Components/Card';
import CardModal from '../Components/Modal';
import CreateCardModal from '../Components/Modal';
import { Edit3, Trash2 } from 'lucide-react'

const Profile = () => {
    const [myCards, setMyCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [modalType, setModalType] = useState(null); // 'create' or 'edit'

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

    const handleUpdateCard = async (updatedCard) => {
        try {
            const updatedData = await cardService.updateCard(updatedCard._id, updatedCard);
            setMyCards(prevCards =>
                prevCards.map(card =>
                    card._id === updatedData._id ? updatedData : card
                )
            );
            setModalType(null); // Close the modal after updating
            setSelectedCard(null);
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    const handleDeleteCard = async (cardId) => {
        try {
            await cardService.deleteCard(cardId);
            setMyCards(prevCards =>
                prevCards.filter(card => card._id !== cardId)
            );
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const handleCreateCard = (newCard) => {
        setMyCards(prevCards => [...prevCards, newCard]);
        setModalType(null); // Close the modal after creation
    };

    const handleCardEdit = (card) => {
        setSelectedCard(card);
        setModalType('edit'); // Open the edit modal
    };

    const handleCloseModal = () => {
        setModalType(null); // Close the modal
        setSelectedCard(null); // Clear selected card for editing
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading cards: {error.message}</div>;

    return (
        <div className="profile-container">
            <div className="flex justify-between items-center mb-4">
                <h1>My Cards</h1>
                <button
                    onClick={() => setModalType('create')} // Open create modal
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Create New Card
                </button>
            </div>

            {myCards.length === 0 ? (
                <p>You have no cards yet.</p>
            ) : (
                <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-4">
                    {myCards.map(card => (
                        <div key={card._id} className="relative">
                            <Card card={card} onEdit={() => handleCardEdit(card)}/>
                            <div className="flex justify-between mt-2">
                            <button
                                onClick={() => handleCardEdit(card)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
                                >
                                <Edit3 className="w-5 h-5" />
                                <span className="ml-2"></span>
                            </button>

                            <button
                                onClick={() => handleDeleteCard(card._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center"
                                >
                                <Trash2 className="w-5 h-5" />
                                <span className="ml-2"></span>
                            </button>


                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for creating new card */}
            {modalType === 'create' && (
                <CreateCardModal
                    onClose={handleCloseModal}
                    onCreate={handleCreateCard}
                />
            )}

            {/* Modal for editing/deleting card */}
            {modalType === 'edit' && selectedCard && (
                <CreateCardModal
                    card={selectedCard}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateCard}
                />
            )}

        </div>
    );
};

export default Profile;
