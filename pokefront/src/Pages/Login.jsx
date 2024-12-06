import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../Services/api";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { token } = await authService.login(credentials.email, credentials.password);
            localStorage.setItem("token", token);
            navigate("/cards");
        } catch (error) {
            setError(error.message || "Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container login-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit} className="auth-form login-form">
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        placeholder="Entrez votre email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        placeholder="Entrez votre mot de passe"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                </button>
            </form>

            <p>
                Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
            </p>
        </div>
    );
};

export default Login;