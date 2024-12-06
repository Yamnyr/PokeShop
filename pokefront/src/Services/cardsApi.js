import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/card";

export const cardService = {
    fetchCards: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axios.get(`${API_BASE_URL}/getall?${queryParams}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    fetchMyCards: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/getmycards`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    // Nouvelle méthode pour mettre à jour une carte
    updateCard: async (cardId, cardData) => {
        try {
            console.log(cardData)
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_BASE_URL}/update/${cardId}`, cardData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    // Nouvelle méthode pour supprimer une carte
    deleteCard: async (cardId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_BASE_URL}/delete/${cardId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    fetchTypes: async () => {
        try {
            const response = await axios.get("http://localhost:8080/type/getall");
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    // Méthode pour récupérer les types de cartes
    fetchCardTypes: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/type/getall', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createCard: async (cardData) => {
        try {
            console.log(cardData)
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/create`, cardData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};