import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";


// CSS
import "../assets/css/style.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUtensils,
    faTags,
    faUser,
    faBellConcierge,
    faList,
    faPhone,
    faArrowRightFromBracket,
    faIdCardClip,
    faImage,
} from "@fortawesome/free-solid-svg-icons";

// img
import navbar_logo from "../assets/img/navbar_logo.png";
import navbar_logo_web from "../assets/img/navbar_logo.webp";

// Navbar links
import { NavLink, Link, useNavigate } from "react-router-dom";

import { removeUser } from "../store/slices/Userslice";

function Header() {
    const [login, setLogin] = useState("Sign in");
    Axios.defaults.withCredentials = true;
    const { data: user,isLoading } = useSelector((state) => state.user);
    const count = useSelector((state) => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const handleLogout = async () => {
        localStorage.removeItem("authToken")
        dispatch(removeUser());
        Swal.fire({
            title: "Logout Successfully!",
            icon: "success",
        });
        setLogin("Sign in");
        
        // try {
        //     const res = await Axios.get("https://flavourslabbackend.onrender.com/api/auth/logout");
        //     if (res.data.status) {
        //         navigate("/");
        //         setLogin("Sign in");
                // Swal.fire({
                //     title: "Logout Successfully!",
                //     icon: "success",
                // });
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    };

    const handleVerify = async () => {
        try {
            const res = await Axios.get("https://flavourslabbackend.onrender.com/api/auth/verify", {
                withCredentials: true,
            });
            if (!res.data.status) {
                alert("Oops! Kindly login to access this page.");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        
        // }  

        if(!isLoading){
            if(localStorage.getItem("authToken") && !isLoading && Object.keys(user).length !== 0){
               
                
               setLogin(user?.name)
              
                
                
            }
            
        }


        
    }, [user]);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector(".navbar");
            const scrolled = window.scrollY > 100;

            if (scrolled) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header id="header">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top shadoww">
                    <div className="container">
                        <NavLink to="/" className="text-decoration-none imgg">
                            <picture>
                                <source srcSet={navbar_logo_web} type="image/webp" />
                                <source srcSet={navbar_logo} type="image/png" />
                                <img src={navbar_logo} className="img-fluid" alt="icon" />
                            </picture>
                        </NavLink>
                        <NavLink to="/" className="text-decoration-none">
                            <span className="ps-lg-4 ps-0 logo_name">The Flavors Lab</span>
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown" data-bs-theme="dark">
                            <ul className="navbar-nav justify-content-end flex-grow-1 text-center">
                                <li className="nav-item gapping">
                                    <NavLink className="nav-link" aria-current="page" to="/">
                                        <FontAwesomeIcon icon={faList} />
                                        &nbsp; Home
                                    </NavLink>
                                </li>

                                <li className="nav-item gapping ">
                                    <NavLink className="nav-link" to="/gallery">
                                        <FontAwesomeIcon icon={faImage} />
                                        &nbsp; Gallery
                                    </NavLink>
                                </li>

                                <li className="nav-item gapping position-relative">
                                    <Link className="nav-link" to="/coupon" onClick={handleVerify}>
                                        <FontAwesomeIcon icon={faTags} />
                                        &nbsp; Offers
                                    </Link>
                                </li>

                                <li className="nav-item gapping">
                                    <Link className="nav-link" to="/contactus" onClick={handleVerify}>
                                        <FontAwesomeIcon icon={faPhone} />
                                        &nbsp; Contact Us
                                    </Link>
                                </li>

                                {login === "Sign in" ? (
                                    <li className="nav-item gapping">
                                        <NavLink className="nav-link" to="/login">
                                            <FontAwesomeIcon icon={faUser} />
                                            &nbsp; {login}
                                        </NavLink>
                                    </li>
                                ) : (
                                    <li className="nav-item dropdown gapping">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            id="navbarDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <FontAwesomeIcon icon={faUser} />
                                            &nbsp; {login.length > 5 ? login.substring(0, 5) + ".." : login}
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink className="dropdown-item" to="/profile">
                                                    <FontAwesomeIcon icon={faIdCardClip} />
                                                    &nbsp; Profile
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink className="dropdown-item" to="/order">
                                                    <FontAwesomeIcon icon={faUtensils} />
                                                    &nbsp; Orders
                                                </NavLink>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" style={{ border: "1px solid rgb(133 133 133)" }} />
                                            </li>
                                            <button onClick={handleLogout} type="button" className="btn btn-dark ms-3">
                                                Logout &nbsp;
                                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                            </button>
                                        </ul>
                                    </li>
                                )}

                                <li className="nav-item gapping position-relative">
                                    <NavLink className="nav-link" to="/cart">
                                        <FontAwesomeIcon icon={faBellConcierge} />
                                        &nbsp; Cart
                                        <span className="cart_item">{login === "Sign in" ? 0 : count.length}</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
