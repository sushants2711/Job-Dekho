import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

export const ErrorPage = () => {
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
                <meta
                    name="description"
                    content="Oops! The page you are looking for doesn’t exist. Return to the homepage and explore job listings on Job Dekho."
                />
                <meta
                    name="keywords"
                    content="Error, 404, Not Found, Job Dekho, Missing Page"
                />
            </Helmet>
            <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
                <div className="text-center">
                    <h1 className="display-1 text-danger">404</h1>
                    <h3 className="mb-4">Oops! Page not found</h3>
                    <p className="mb-4">The page you are looking that is temporarily unavailable.</p>
                    <NavLink to="/" className="btn btn-primary btn-lg">Go to Home</NavLink>
                </div>
            </div>
        </>
    );
};
