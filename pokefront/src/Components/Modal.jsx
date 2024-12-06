import React, { useState, useEffect } from 'react';
import { cardService } from '../Services/cardsApi';

const Modal = ({ card, onClose, onUpdate, onDelete }) => {
    const [cardData, setCardData] = useState({
        name: card.name,
        price: card.price,
        type: card.type._id,
        image: card.image
    });
    const [types, setTypes] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const typesData = await cardService.fetchCardTypes();
                setTypes(typesData);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };
        fetchTypes();
    }, []);

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
            const updatedCard = await cardService.updateCard(card._id, cardData);
            onUpdate(updatedCard);
            onClose();
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
            try {
                setIsDeleting(true);
                await cardService.deleteCard(card._id);
                onDelete(card._id);
                onClose();
            } catch (error) {
                console.error('Error deleting card:', error);
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl mb-4">Modifier la Carte</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Nom</label>
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
                        <label className="block mb-2">Prix</label>
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
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">URL de l'image</label>
                        <input
                            type="text"
                            name="image"
                            value={cardData.image}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Mettre à jour
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            {isDeleting ? 'Suppression...' : 'Supprimer'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;