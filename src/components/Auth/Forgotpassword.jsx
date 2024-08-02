import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// img
import img1 from '../../assets/img/reset_pass_logo.png';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Forgotpassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios.defaults.withCredentials = true;

    try {
      setLoading(true);

      // Validation
      if (!email) {
        // console.error("Email is required");
        alert("Kindly enter valid email to reset your password.");
        return;
      }

      // API call
      const response = await Axios.post('https://flavourslabbackend.onrender.com/api/auth/forgot', {
        email,

      },{
        headers:{
          "authToken":localStorage.getItem("authToken")
      }
      });
      if(response.data.error){
        alert("Email does not exist!");
      }

      if (response.data.status) {
        // Success
        alert("Check your email for the password reset link");
        navigate('/Login');

      } else {
        // Handle other scenarios if needed
        // console.error("Failed to send reset password email");
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
    <>
      <section id='login-form'>
        <div className='container'>
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

                    <div className='input-group mb-3'>
                      <p className='reset_link'>Enter your user account's verified email address and we will send you a password reset link.</p>
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-append">
                        <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} style={{ color: '#c39f75', fontSize: '20px' }} /></span>
                      </div>
                      <input type="email" name="email" className="form-control input_user" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="d-flex justify-content-center mt-4 login_container">
                      <button type="submit" name="button" disabled={loading} className="btn signup_btn"> {loading ? 'Submitting...' : 'Send password reset on email'}</button>
                    </div>
                    
                  </form>
                </div>

                <div className="mt-3">
                  <div className="text-center justify-content-center links forgot_login" style={{ paddingBottom: "35px" }}>
                    OR <br />
                    <Link to='/login'> Login</Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Forgotpassword;