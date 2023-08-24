import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AuthenticationMessage from "../helpers/authenticationMessage";

import Home from "../pages/Home/Index";
import Category from "../pages/Category/Index";
import Tool from "../pages/Tool/Index";
import SingleTool from "../pages/Tool/SingleTool";
import About from "../pages/About/Index";
import Cart from "../pages/Cart/Index";
import Register from "../pages/User/Index";
import Dashboard from "../pages/User/Dashboard";
import HOC from "../helpers/HOC/Auth";
import Admin from "../pages/Admin/Index";

function Router() {
    const isLoggedIn = useSelector(state => state.user.isLogged);


    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <HOC child={Home} auth={true} /> : <AuthenticationMessage />} />
            <Route path="/tool" element={isLoggedIn ? <HOC child={Tool} auth={true} /> : <AuthenticationMessage />} />
            <Route path="/tool/byCategory/:id" element={isLoggedIn ? <HOC child={Category} auth={true} /> : <AuthenticationMessage />} />
            <Route path="/tool/:id" element={isLoggedIn ? <HOC child={SingleTool} auth={true} /> : <AuthenticationMessage />} />
            <Route path="/about" element={isLoggedIn ? <HOC child={About} auth={true} /> : <AuthenticationMessage />} />
            <Route path="/cart" element={isLoggedIn ? <HOC child={Cart} auth={true} /> : <AuthenticationMessage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isLoggedIn ? <HOC child={Dashboard} auth={true} /> : <AuthenticationMessage />} />
            <Route path="/admin" element={isLoggedIn ? <HOC child={Admin} auth={true} /> : <AuthenticationMessage />} />
        
        </Routes>
    );
}

export default Router;
