import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Updated import statement

const NavBar = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.username);
            } catch (error) {
                console.error("Erreur de décodage du token :", error);
            }
        }
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Déconnexion réussie");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/cards" className="nav-link">PokeShop</Link>
                </li>
                <div className="right-section">
                    <li>
                        <Link to="/profile" className="nav-link">
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
