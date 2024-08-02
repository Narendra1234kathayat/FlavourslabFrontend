import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// img
import img1 from "../../assets/img/signup_logo.png";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope, faPhone, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const navigate = useNavigate();
  // Axios.defaults.withCredentials = true;

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

    if (!name || !email || !password || !number) {
      alert("Kindly fill all the fields to sign up.");
      return;
    }
    if (number.length !== 10) {
      alert("Kindly provide a valid number.");
      return;
    }
    if (password.length < 5) {
      alert("Password should be at least 5 characters long.");
      return;
    }
    if (name.length < 2) {
      alert("Please enter a valid name.");
      return;
    }


    try {
      const emailCheck = await Axios.post('https://flavourslabbackend.onrender.com/api/auth/check-email', { email });
      // console.log(emailCheck)
      if (emailCheck.data.exists) {
        alert("Email Already Exists!");
        return;
      }

      const numberCheck = await Axios.post('https://flavourslabbackend.onrender.com/api/auth/check-number', { number });
      if (numberCheck.data.exists) {
        alert("Number Already Exists!");
        return;
      }

      const response = await Axios.post('https://flavourslabbackend.onrender.com/api/auth/signup', {
        name,
        email,
        password,
        number,
      });

      if (response.data.status) {
        alert("Account Created Successfully!");
        navigate("/login");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error occurred. Please try again later.");
    }
  };
  return (
    <>
      <section id="login-form">
        <div className="container">
          <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
              <div className="signup_card border-5">
                <div className="d-flex justify-content-center">
                  <div className="brand_logo_container">
                    <img src={img1} className="brand_logo" alt="Logo" />
                  </div>
                </div>
                <div className="d-flex justify-content-center form_container">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: "#c39f75", fontSize: "20px" }}
                          />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="name"
                        className="form-control input_user"
                        value={name}
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <FontAwesomeIcon
                            icon={faPhone}
                            style={{ color: "#c39f75", fontSize: "20px" }}
                          />
                        </span>
                      </div>
                      <input
                        type="number"
                        name="number"
                        className="form-control input_user"
                        placeholder="Number"
                        autoComplete="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ color: "#c39f75", fontSize: "20px" }}
                          />
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        className="form-control input_user"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="input-group position-relative">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <FontAwesomeIcon
                            icon={faKey}
                            style={{ color: "#c39f75", fontSize: "20px" }}
                          />
                        </span>
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
                      <button
                        type="submit"
                        name="button"
                        className="btn signup_btn">
                        Signup
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-3">
                  <div
                    className="text-center justify-content-center links"
                    style={{ paddingBottom: "35px" }}>
                    Already have an account?
                    <Link to="/login"> Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;