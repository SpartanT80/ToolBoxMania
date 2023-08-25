// AuthenticationMessage.js
import React from "react";
import { Link } from "react-router-dom"; // Import the Link component

function AuthenticationMessage() {
    return (
        <>
            <h1>Welcome to ToolBoxMania!</h1>
            <h2 className="authenticateText">Your Ultimate Destination for Professional Tools</h2>
            <Link className="authenticateLink" to="/register">Register or Sign In to Explore Our Premium Product Range</Link>

        </>
    );
}

export default AuthenticationMessage;
