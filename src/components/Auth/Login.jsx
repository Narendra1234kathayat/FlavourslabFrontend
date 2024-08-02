import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FetchUser } from "../../store/slices/Userslice";
import img2 from "../../assets/img/login_logo.png";
import Axios from "axios";
import GoogleButton from "react-google-button";
import Swal from 'sweetalert2';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const handleVerify = async () => {
            try {
                const res = await Axios.get('https://flavourslabbackend.onrender.com/api/auth/verify',{
                    withCredentials:true

                });
                if (res.data.status) {
                    navigate('/');
                } else {
                    // Handle unauthorized user
                }
            } catch (error) {
                console.log("Error:", error);
            }
        };
        handleVerify();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Kindly enter valid email and password to proceed.");
            return;
        }

        try {
            const response = await Axios.post("https://flavourslabbackend.onrender.com/api/auth/login", {
                email,
                password,
            },{
                withCredentials: true,
            });
            console.log(response.data.authToken,"fdsaf")
            const tokens=response.data.authToken
            Cookies.set("token",tokens)
           
            localStorage.setItem("accesstoken",tokens)

            if (response.data.error === "Invalid credentials") {
                Swal.fire({
                    icon: "error",
                    title: "Invalid username or password!",
                });
            } else if (response.data.status) {
                dispatch(FetchUser());
                navigate("/");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section id="login-form">
            <div className="container">
                <div className="container h-100">
                    <div className="d-flex justify-content-center h-100">
                        <div className="user_card border-5">
                            <div className="d-flex justify-content-center">
                                <div className="brand_logo_container">
                                    <img src={img2} className="brand_logo" alt="Logo" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center form_container">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faEnvelope} style={{ color: "#c39f75", fontSize: "20px" }} />
                                            </span>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control input_user"
                                            autoComplete="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group mb-3 position-relative">
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faKey} style={{ color: "#c39f75", fontSize: "20px" }} />
                                            </span>
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control input_user"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            onClick={togglePasswordVisibility}
                                            className="position-absolute"
                                            style={{ color: "black", right: "13px", top: "15px", cursor: "pointer", height: "20px", zIndex: "99" }}
                                        />
                                    </div>

                                    <div className="links">
                                        <Link to="/forgotpassword">Forgot your password?</Link>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3 login_container">
                                        <button type="submit" name="button" className="btn login_btn">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-3">
                                <div className="text-center justify-content-center links">
                                    Don't have an account? <Link to="/signup">Sign Up</Link>
                                </div>
                            </div>

                            <span className="text-white text-center mt-2">OR</span>

                            <div className="google-btn p-3 mx-auto">
                                <GoogleButton
                                    onClick={() => {
                                        console.log("Google button clicked");
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
