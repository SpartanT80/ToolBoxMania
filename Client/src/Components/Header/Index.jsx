import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { signOut } from "../../store/slices/user";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import style from "./header.module.css";

import logo from "../../assets/Logo2.png"

function Header() {
    const dispatch = useDispatch();
    const { user, cart } = useSelector(state => state);
    console.log(user)

    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOut());
        navigate("/");
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
    }

    return (
        <header className={style.headerCtn}>

            <small><span className={style.banner}>Free delivery from 100€ !</span></small>

            <Link to={"/cart"} className={style.cartBanner}>
                <FontAwesomeIcon icon={faCartShopping} className={style.cartIcon} />
                <span>{cart.totalAmount}€</span>
            </Link>

            <Link to="/">
                <h1>
                    <img src={logo} className={style.logo} alt="To the homepage" />
                </h1>
            </Link>


            <nav>
                <NavLink to="/about">About us</NavLink>
                <NavLink to="/tool">Tools</NavLink>
                <NavLink to="/cart">Cart</NavLink>

                {!user.isLogged ?
                    <NavLink to="/register" state={{ type: "sign in" }}>Sign In</NavLink>
                    :
                    <>
                        <NavLink to="/dashboard">Account</NavLink>
                        <button className={style.CTA_signOut} onClick={handleSignOut}>Sign Out</button>
                    </>
                }
            </nav>

        </header>
    )
}

export default Header;