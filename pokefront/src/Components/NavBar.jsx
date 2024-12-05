import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Updated import statement

const NavBar = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Récupérez le token du localStorage
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Décoder le token pour extraire le username
                const decoded = jwtDecode(token);  // Updated function call
                setUsername(decoded.username);
            } catch (error) {
                console.error("Erreur de décodage du token :", error);
            }
        }
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimez le token et redirigez l'utilisateur vers la page de connexion
        localStorage.removeItem("token");
        alert("Déconnexion réussie");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/home" className="nav-link">Le Coin Sympa</Link>
                </li>
                <li>
                    <Link to="/user" className="nav-link">User</Link>
                </li>

                <div className="right-section">
                    <li>
                        <Link>
                        {username && <span>Bienvenue, {username}</span>} {/* Message de bienvenue */}
                        </Link>
                    </li>
                    <li>
                        <button className="logout-button" onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default NavBar;
