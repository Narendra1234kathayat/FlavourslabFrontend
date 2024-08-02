import React from "react";
import Axios from "axios";
import { useState } from "react";


// CSS
import '../assets/css/style.css';

// img
import contact from '../assets/img/contact.png';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

import Form from "./Form";

function Contactus() {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        person: "",
    });

    const [formErrors, setFormErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        person: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        // Validate and update form errors
        const newFormErrors = { ...formErrors };
        if (!value.trim()) {
            newFormErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else {
            newFormErrors[name] = '';
        }
        setFormErrors(newFormErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate on submit
        const newFormErrors = { ...formErrors };
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newFormErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            } else {
                newFormErrors[key] = '';
            }
        });
        setFormErrors(newFormErrors);

        // If any field is empty, do not submit the form
        if (Object.values(newFormErrors).some((error) => error !== '')) {
            return;
        }

        try {
            const response = await Axios.post(
                "https://flavourslabbackend.onrender.com/api/form/reservationform",
                formData,{
                    headers:{
                        "authToken":localStorage.getItem("authToken")
                    }
                }
            );
            console.log(response);

            if (response.data.error && response.data.error.length > 0) {
                // If there are errors, display the first error message
                alert(response.data.error[0].msg);
            } else if (response.data.success) {
                // If the request is successful, display success message
                alert("Your reservation has been successfully submitted.");
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    person: 'select'
                });
                setFormErrors({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    person: ''
                });
            } else {
                // Handle other errors
                alert("An error occurred.");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <>

            <header className="contactus">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="ms-xl-5">Contact us</h1>
                        </div>
                        <div className="col-md-6 ">
                            <div className="timing">
                                <h4>Open time</h4>
                                <div className="d-flex justify-content-between days">
                                    <span>Tuesday - Friday</span>
                                    <span>Saturday - Sunday</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>
                                        Lunch
                                        <br />
                                        11:00 am - 2:00 pm
                                        <br />
                                        <br />
                                        Dinner
                                        <br />
                                        5:00 am - 11:00 pm
                                    </p>
                                    <p>
                                        Lunch
                                        <br />
                                        12:00 am - 2:30 pm
                                        <br />
                                        <br /> Dinner
                                        <br />
                                        7:00 am - 11:00 pm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="reservation pt-5">
                <div className="container">
                    <div className="title">
                        <h1>Make your Reservation</h1>
                        <p>Get in touch with our Restaurant</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-lg-5 my-md-3 my-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            className="form-control border-black fs-4 forms"
                                            placeholder="First name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                        <span className="error-message " id="fnameError">
                                            {formErrors.first_name}
                                        </span>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            className="form-control border-black fs-4 forms"
                                            placeholder="Last name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                        <span className="error-message" id="lnameError">
                                            {formErrors.last_name}
                                        </span>
                                    </div>
                                    <div className="col-12">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control border-black fs-4 forms"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <span className="error-message" id="emailError">
                                            {" "}
                                            {formErrors.email}
                                        </span>
                                    </div>
                                    <div className="col-12">
                                        <input
                                            type="number"
                                            name="phone"
                                            id="phone"
                                            className="form-control border-black fs-4 forms"
                                            placeholder="Phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        <span className="error-message" id="numError">
                                            {formErrors.phone}
                                        </span>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            className="form-control border-black fs-4 forms"
                                            placeholder="Select Date"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                        <p className="text-color text-start">
                                            <i>Click above icon to select Date</i>
                                        </p>
                                        <span className="error-message" id="dateError">
                                            {formErrors.date}
                                        </span>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="time"
                                            name="time"
                                            id="time"
                                            className="form-control border-black fs-4 forms"
                                            placeholder="Select Time"
                                            value={formData.time}
                                            onChange={handleChange}
                                        />
                                        <p className="text-color text-start">
                                            <i>Click above icon to select Time</i>
                                        </p>
                                        <span className="error-message" id="timeError">
                                            {formErrors.time}
                                        </span>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <select
                                            name="person"
                                            id="person"
                                            className="form-control fs-4 forms"
                                            value={formData.person}
                                            onChange={handleChange}>
                                            <option value="select">-- Select Person --</option>
                                            <option className="bg-black text-white" value="1">1</option>
                                            <option className="bg-black text-white" value="2">2</option>
                                            <option className="bg-black text-white" value="3">3</option>
                                            <option className="bg-black text-white" value="4">4</option>
                                            <option className="bg-black text-white" value="5">5</option>
                                            <option className="bg-black text-white" value="6">6</option>
                                            <option className="bg-black text-white" value="7">7</option>
                                            <option className="bg-black text-white" value="8">8</option>
                                            <option className="bg-black text-white" value="9">9</option>
                                            <option className="bg-black text-white" value="10">10</option>
                                            <option className="bg-black text-white" value="12">11</option>
                                            <option className="bg-black text-white" value="14">12</option>
                                            <option className="bg-black text-white" value="14">13</option>
                                        </select>
                                        <span className="error-message" id="seatError">
                                            {formErrors.person}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="submit">
                                Book now
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section className="address py-5">
                <div className="container">
                    <div className="row rounded-3 align-items-stretch mx-2 mx-lg-0 bg shadow">
                        <div className="col-12 col-lg-6 d-flex align-items-center text-center text-lg-start ps-0 pe-0 pe-lg-2">
                            <img src={contact} alt="img" className="img-fluid rounded-3 h-100" />
                        </div>
                        <div className="col-12 col-lg-6 py-5 links">
                            <h2 className="text-white mb-4">
                                We can be contacted via email: <a href="mailto: theflavorslab980@gmail.com">theflavorslab980@gmail.com</a>
                            </h2>
                            <h2 className="text-white">
                                Telephone on: <br /> <a href="tel: +91 9157312511">+91 9157312511</a>
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="reservation">
                <div className="container">
                    <div className="title text-center">
                        <h1>Contact Us <FontAwesomeIcon icon={faAddressBook} color="#c39f75" className="fs-1" /></h1>
                    </div>
                    <Form />
                </div>
            </section>

        </>
    );
}

export default Contactus;