import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">

                <div className="navbar-brand text-white ps-5">Intern House</div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ps-3">
                            <NavLink className="nav-link text-gray" to="/">
                                Job Posting
                            </NavLink>
                        </li>
                        <li className="nav-item ps-3">
                            <NavLink className="nav-link text-gray" to="/add">
                                Post a Job
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};
