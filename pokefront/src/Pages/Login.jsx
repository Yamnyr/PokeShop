import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                password,
                email,
            });

            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (error) {
            setError(error.response ? error.response.data : "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container login-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit} className="auth-form login-form">
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

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>

            <p>
                Vous n'avez pas de compte? <a href="/register">S'inscrire</a>
            </p>
        </div>
    );
};

export default Login;
