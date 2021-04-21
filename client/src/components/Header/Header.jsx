import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo/InStock-Logo.svg';
import './header.scss';



function Header() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar__logo-wrap">
                    <Link to="/" className="navbar__logo-link"> 
                    <img src={logo} className="navbar__logo" alt="Instock Logo" /> 
                    </Link>
                </div>
                <div className="navbar__button-wrap">
                    <NavLink to="/" exact activeClassName="navbar--active" className="navbar__btn-link"><button className="navbar__btn">Warehouses</button></NavLink>
                    <NavLink to="/inventory" activeClassName="navbar--active" className="navbar__btn-link"><button className="navbar__btn">Inventory</button></NavLink>
                </div>
            </nav>
        </>
    )
}

export default Header;
