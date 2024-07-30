import React from "react";

// img
import navbar_logo from '../assets/img/navbar_logo.png';
import navbar_logo_web from '../assets/img/navbar_logo.webp';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-3 col-md-12 text-center logo">
                            <Link to="/">
                                <picture>
                                    <source srcSet={navbar_logo_web} type="image/webp" />
                                    <source srcSet={navbar_logo} type="image/png" />
                                    <img src={navbar_logo} className="img-fluid" alt="icon" />
                                </picture>
                            </Link>
                            <h4>The Flavors Lab</h4>
                        </div>
                        <div className="col-lg-2 col-md-6 text-lg-start text-center">
                            <h5>Quick Links</h5>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><a href="/coupon">Offer </a></li>
                                <li><a href="/profile">Profile</a></li>
                                <li><a href="/order">Orders</a></li>
                                <li><a href="/contactus">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 text-lg-start text-center">
                            <h5>Top Dishes</h5>
                            <ul>
                                <li><p className="mb-0">Cheesy Pizza</p></li>
                                <li><p className="mb-0">Chocolate Decadence</p></li>
                                <li><p className="mb-0">Chocolate Brownie</p></li>
                                <li><p className="mb-0">Chicken Tandoori</p></li>
                                <li><p className="mb-0">Panner Angara</p></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 text-lg-start text-center open">
                            <h5>Opening Hours</h5>
                            <p>TUE - FRI <br /> 11am - 2pm (Noon) <br /> 5am - 11pm (Nig)</p>
                            <p>SAT - SUN <br /> 12am - 2:30pm (Noon) <br /> 7pm - 11pm (Nig)</p>
                        </div>
                        <div className="col-lg-2 col-md-6  text-lg-start text-center contacts">
                            <h5>Contact Us</h5>
                            <p>32, The Flavours Lab, Lotus Elite, Gotri - Sevasi Rd, Vadodara 390021</p>
                            <ul>
                                <li><a className="hover" href="tel: +91 9157312511">+91 9157312511</a></li>
                                <li><a className="hover" href="mailto: theflavorslab980@gmail.com">theflavorslab980@gmail.com</a></li>
                                <div className="d-flex justify-content-lg-start justify-content-center ">
                                    <a target="_blank" href="https://www.facebook.com/theflavourlab/">
                                        <FontAwesomeIcon className="hover"
                                            icon={faFacebook}
                                            style={{ color: "#ffffff" }}
                                        />
                                    </a>
                                    <a target="_blank" href="https://twitter.com/flavour_lab">
                                        <FontAwesomeIcon className="hover"
                                            icon={faTwitter}
                                            style={{ color: "#ffffff" }}
                                        />
                                    </a>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="row copyright pt-3">
                        <div className="col-lg-6 text-lg-start text-center">
                            <p>Copyright &copy; The Flavors Lab. All right reserved.</p>
                        </div>
                        <div className="col-lg-6 text-lg-end text-center">
                            <p>
                                Website designed by <a className="hover" href="https://www.dotsandcoms.in/">D&C</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Footer;