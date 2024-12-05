import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email === "dupuispablo@gmail.com" && password === "1234") {
            alert("Vous êtes connecté");
            navigate("/players");
        } else {
            alert("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Connexion</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="login-button"
                >
                    Se connecter
                </button>
            </div>
        </div>
    );
};

export default Login;