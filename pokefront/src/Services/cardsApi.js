import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/card";

export const cardService = {
    fetchCards: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getall`);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    },
};