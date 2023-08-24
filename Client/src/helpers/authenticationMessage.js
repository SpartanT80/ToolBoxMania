// AuthenticationMessage.js
import React from "react";
import { Link } from "react-router-dom"; // Import the Link component

function AuthenticationMessage() {
    return (
        <>
            <h1>Welcome to ToolBoxMania !!!</h1>
            <h2>We are a WEB SHOP for professional</h2>

            <Link to="/register">Click here to register  or sign in and see all our awesome products !!!</Link>
        </>
    );
}

export default AuthenticationMessage;
