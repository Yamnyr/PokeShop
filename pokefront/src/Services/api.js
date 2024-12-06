import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/user";

export const authService = {
    /**
     * Connecte un utilisateur
     * @param {string} email
     * @param {string} password
     * @returns {Promise}
     */
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Erreur de connexion');
        }
    },

    /**
     * Inscrit un nouvel utilisateur
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {Promise}
     */
    register: async (username, email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Erreur d\'inscription');
        }
    }
};