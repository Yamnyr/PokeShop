import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Wrapper = ({ children }) => {
    const location = useLocation();
    const excludedRoutes = ["/", "/register"];

    const isExcluded = excludedRoutes.includes(location.pathname);
    return (
        <div className="flex flex-col min-h-screen">
            {!isExcluded && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Wrapper;