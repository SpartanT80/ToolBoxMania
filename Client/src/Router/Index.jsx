import { Routes, Route } from "react-router-dom";
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
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tool" element={<Tool />} />
            <Route path="/tool/byCategory/:id" element={<Category />} />
            <Route path="/tool/:id" element={<SingleTool />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<HOC child={Dashboard} auth={true} />} />
            <Route path="/dashboard" element={<HOC child={Dashboard} auth={true} />} />
            <Route path="/admin" element={<HOC child={Admin} auth={true} />}/>
        </Routes>
    )
}

export default Router;