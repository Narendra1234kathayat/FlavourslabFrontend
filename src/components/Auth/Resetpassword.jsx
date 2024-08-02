import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

// img
import img1 from '../../assets/img/reset_pass_logo.png';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Resetpassword() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();
    Axios.defaults.withCredentials = true;
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const passwordInput = document.querySelector("#password");
        const eye = document.querySelector("#eye");

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        if (eye && passwordInput) {
            eye.addEventListener("click", togglePasswordVisibility);
        }

        return () => {
            if (eye && passwordInput) {
                eye.removeEventListener("click", togglePasswordVisibility);
            }
        };
    }, [showPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Validation
            if (!password) {
                alert("Kindly create your new password.");
                return;
            }

            if (password.length < 5) {
                alert("Password should be at least 5 characters long.");
                return;
            }

            // API call
            const response = await Axios.post(`https://flavourslabbackend.onrender.com/api/auth/reset-password/${token}`, {
                password,
            });

            if (response.data.status) {
                // Success
                alert("Your password has been reset successfully.");
                navigate('/login');
            } else {
                // Handle other scenarios if needed
                console.error("Failed to reset password");
            }
        } catch (error) {
            console.error("API Error:", error);
            // Display user-friendly error message
            alert("Error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id='login-form'>
            <div className='container'>
                <div className='d-flex justify-content-center h-100'>
                    <div className="signup_card border-5">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img src={img1} className="brand_logo" alt="Logo" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <form onSubmit={handleSubmit}>
                                <div className='input-group mb-3'>
                                    <p className='reset_link text-center'>Kindly enter your new password below to reset your current password.</p>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faKey} style={{ color: '#c39f75', fontSize: '20px' }} /></span>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="pass"
                                        className="form-control input_user"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        id="eye"
                                        className="position-absolute"
                                        style={{
                                            color: "black",
                                            right: "13px",
                                            top: "15px",
                                            cursor: "pointer",
                                            height: "20px",
                                            zIndex: "99",
                                        }}
                                    />
                                </div>

                                <div className="d-flex justify-content-center mt-4 login_container">
                                    <button type="submit" name="button" disabled={loading} className="btn signup_btn"> {loading ? 'Submitting...' : 'Reset Password'}</button>
                                </div>

                                <br />
                                <div>
                                    <div className="text-center text-white justify-content-center links forgot_login" style={{ paddingBottom: "35px" }}>
                                        OR <br />
                                        <Link to='/login'> Login</Link>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Resetpassword;
