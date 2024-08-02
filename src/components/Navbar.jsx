import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import Swal from 'sweetalert2';
import Cookies from "js-cookie"
// CSS
import "../assets/css/style.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faTags, faUser, faBellConcierge, faList, faPhone, faArrowRightFromBracket, faIdCardClip, faImage } from "@fortawesome/free-solid-svg-icons";

// img
import navbar_logo from "../assets/img/navbar_logo.png";
import navbar_logo_web from "../assets/img/navbar_logo.webp";

// Navbar links
import { NavLink, Link, useNavigate } from "react-router-dom";

function Header() {
    const [userData, setUserData] = useState({});
    const [tokens, setTokens] = useState(false);
    const [login, setLogin] = useState("Sign in"); // Initialize login state with "Sign in"
    Axios.defaults.withCredentials = true;
    const { data: user } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const count = useSelector((state) => state.cart)

    const getUser = async () => {
        try {
            const response = await Axios.post(
                "https://flavourslabbackend.onrender.com/api/auth/getuser",{
                    withCredentials:true,
                    headers: {
                        Authorization:Cookies.get("token")
                    }
                }
            );
            if (response) {
                
                const user = response.data;
                setUserData(user);
                console.log(user);
                

                // Capitalize the first letter of the name of user
                const capitalizedFirstName = user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Sign in";
                setLogin(capitalizedFirstName); // Set login state with capitalized first letter
            } else {
                console.log("Failed to fetch user data");
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };
    useEffect(() => {
       

       if(localStorage.getItem("token") || localStorage.getItem("accessToken")){
           getUser()
       } // Always fetch user data on component mount
    }, [localStorage.getItem("token")]); // Update userData whenever user changes

    const handleLogout = async () => {
        await Axios.get('https://flavourslabbackend.onrender.com/api/auth/logout')
            .then(res => {
                if (res.data.status) {
                    navigate('/');
                    setLogin("Sign in");
                    setTokens(false);
                    
                    Swal.fire({
                        title: "Logout Successfully!",
                        icon: "success"
                      });

                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleVerify = () => {
        Axios.get("https://flavourslabbackend.onrender.com/api/auth/verify",{
            withCredentials:true
        })
            .then((res) => {
                console.log(res.data.status);
                if (res.data.status) {
                    // User is authorized, you can add your logic here
                    setTokens(true);
                    console.log("token", tokens);
                } else {
                    alert("Oops! Kindly login to access this page.");
                    navigate("/"); 
                    setTokens(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    window.addEventListener("scroll", function () {
        var navbar = document.querySelector(".navbar");
        var scrolled = window.scrollY > 100;

        if (scrolled) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // const closeNavbar = (event) => {
    //     const navbarToggle = document.querySelector(".navbar-toggler");
    //     const dropdownToggle = document.querySelector(".dropdown-toggle");
    //     if (
    //         dropdownToggle &&
    //         (event.target === dropdownToggle || dropdownToggle.contains(event.target))
    //     ) {
    //         return;
    //     }
    //     if (navbarToggle && window.innerWidth <= 992) {
    //         navbarToggle.click();
    //     }
    // };
    // document.addEventListener("click", closeNavbar);


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
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNavDropdown"
                            data-bs-theme="dark">
                            <ul
                                className="navbar-nav justify-content-end flex-grow-1 text-center">
                                <li className="nav-item gapping">
                                    <NavLink className="nav-link" aria-current="page" to="/">
                                        <FontAwesomeIcon icon={faList} />
                                        &nbsp; Home
                                    </NavLink>
                                </li>

                                <li className="nav-item gapping ">
                                    <NavLink
                                        className="nav-link"
                                        to="/gallery">
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
                                        <a className="nav-link dropdown-toggle" href="#" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FontAwesomeIcon icon={faUser} />
                                            &nbsp; {login.length > 5 ? login.substring(0, 5) + ".." : login}

                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><NavLink className="dropdown-item" to="/profile"> <FontAwesomeIcon icon={faIdCardClip} /> &nbsp;Profile</NavLink></li>
                                            <li><NavLink className="dropdown-item" to="/order"> <FontAwesomeIcon icon={faUtensils} />&nbsp;  Orders</NavLink></li>
                                            <li><hr className="dropdown-divider" style={{ border: "1px solid rgb(133 133 133)" }} /></li>
                                            {/* <li><NavLink className="dropdown-item" to="#">Logout &nbsp;<FontAwesomeIcon icon={faArrowRightFromBracket} /> </NavLink></li> */}
                                            <button onClick={handleLogout} type="button" className="btn btn-dark ms-3">Logout &nbsp;<FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
                                        </ul>
                                    </li>
                                )}

                                <li className="nav-item gapping position-relative">
                                    <NavLink className="nav-link" to="/cart">
                                        <FontAwesomeIcon icon={faBellConcierge} />
                                        &nbsp; Cart
                                        <span className="cart_item">{login === "Sign in" ? 0:count.length}</span>
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