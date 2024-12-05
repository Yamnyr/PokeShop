import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification que les mots de passe correspondent
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:8080/user/register", {
                username,
                email,
                password,
            });

            // Si l'inscription est réussie, rediriger l'utilisateur vers la page de login
            navigate("/home");
        } catch (error) {
            setError(error.response ? error.response.data : "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container register-container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit} className="auth-form register-form">
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Entrez votre nom d'utilisateur"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Entrez votre email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Entrez votre mot de passe"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirmez votre mot de passe"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Inscription..." : "S'inscrire"}
                </button>
            </form>

            <p>
                Vous avez déjà un compte? <a href="/">Se connecter</a>
            </p>
        </div>
    );
};

export default Register;
