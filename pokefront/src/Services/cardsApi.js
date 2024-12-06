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

    fetchTypes: async () => {
        try {
            const response = await axios.get("http://localhost:8080/type/getall");
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};