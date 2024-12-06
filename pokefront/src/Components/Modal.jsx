import React, { useState, useEffect } from 'react';
import { cardService } from '../Services/cardsApi';

const CreateCardModal = ({ onClose, onCreate, onUpdate, card }) => {
    const [cardData, setCardData] = useState({
        name: '',
        price: '',
        type: '',
        image: ''
    });

    const [types, setTypes] = useState([]);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const typesData = await cardService.fetchCardTypes();
                setTypes(typesData);
                if (typesData.length > 0 && !card) {
                    setCardData(prev => ({
                        ...prev,
                        type: typesData[0]._id
                    }));
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchTypes();
    }, [card]);

    useEffect(() => {
        if (card) {
            setCardData({
                name: card.name,
                price: card.price,
                type: card.type._id,
                image: card.image || ''
            });
        }
    }, [card]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsCreating(true);
            if (card) {
                const updatedCard = await cardService.updateCard(card._id, cardData);
                onUpdate(updatedCard);
            } else {
                const newCard = await cardService.createCard(cardData);
                onCreate(newCard);
            }
            onClose();
        } catch (error) {
            console.error('Error creating/updating card:', error);
            setIsCreating(false);
        }
    };

    return (
        <div className="modal-overlay open">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{card ? 'Edit Card' : 'Create New Card'}</h2>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={cardData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={cardData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Type</label>
                        <select
                            name="type"
                            value={cardData.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            {types.map(type => (
                                <option key={type._id} value={type._id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Image URL (Optional)</label>
                        <input
                            type="text"
                            name="image"
                            value={cardData.image}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="modal-buttons">
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="primary"
                        >
                            {isCreating ? 'Saving...' : card ? 'Save Changes' : 'Create Card'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCardModal;
