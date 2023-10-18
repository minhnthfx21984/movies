import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

import SearchIcon from "./SearchIcon";

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);

        if (scrollY > 100) {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollY]);

    const navbarClasses = `${classes["navbar"]} ${
        showNavbar ? classes["show"] : ""
    }`;

    return (
        <nav className={navbarClasses}>
            <div>
                <Link to="/" className={classes["brand"]}>
                    Movie App
                </Link>
            </div>
            <div className={classes["search-icon"]}>
                <Link to="/search">
                    <SearchIcon />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
