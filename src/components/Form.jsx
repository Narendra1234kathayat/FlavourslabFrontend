import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        comment: "",
    });

    const [formErrors, setFormErrors] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        comment: "",
    });

    const handleChanges = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        // Validate and update form errors
        const newFormErrors = { ...formErrors };
        if (!value.trim()) {
            newFormErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else {
            newFormErrors[name] = "";
        }
        setFormErrors(newFormErrors);
    };

    const handleSubmits = async (e) => {
        e.preventDefault();

        // Validate on submit
        const newFormErrors = { ...formErrors };
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newFormErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)
                    } is required`;
            } else {
                newFormErrors[key] = "";
            }
        });
        setFormErrors(newFormErrors);

        // If any field is empty, do not submit the form
        if (Object.values(newFormErrors).some((error) => error !== "")) {
            return;
        }

        try {
            const response = await Axios.post(
                "http://localhost:4000/api/form/contactform",
                formData
            );
            if (response.data.success) {
                alert("Data inserted successfully");
                setFormData({
                    first_name:'',
                    last_name:'',
                    phone: '',
                    email: '',
                    comment: ''
                });
                setFormErrors({
                    first_name:'',
                    last_name:'',
                    phone:'',
                    email:'',
                    comment:''
                })
            } else {
                alert("no data inserted");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmits} className="my-lg-5 my-md-2 my-1">
                <div className="row justify-content-center">
                    <div className='col-lg-6'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14763.959687866996!2d73.1299863!3d22.3162209!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc956615158d5%3A0x8a86fd632573e4b7!2sThe%20Flavors%20Lab!5e0!3m2!1sen!2sin!4v1710998961759!5m2!1sen!2sin" style={{ width: "100%", height: "100%", border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="col-lg-6 mt-lg-0 mt-4">
                        <div className="mb-3 row">
                            <div className="col-md-6 mb-3">
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    className="form-control border-black rounded-0 fs-4"
                                    placeholder="First name"
                                    value={formData.first_name}
                                    onChange={handleChanges} />
                                <span className="error-message" id="fnameError">
                                    {formErrors.first_name}
                                </span>
                            </div>
                            <div className="col-md-6 mb-3">
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    className="form-control border-black fs-4 rounded-0"
                                    placeholder="Last name"
                                    value={formData.last_name}
                                    onChange={handleChanges} />
                                <span className="error-message" id="lnameError">
                                    {formErrors.last_name}
                                </span>
                            </div>
                            <div className="col-md-6 mb-3">
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    className="form-control border-black fs-4 rounded-0"
                                    placeholder="Phone number"
                                    value={formData.phone}
                                    onChange={handleChanges} />
                                <span className="error-message" id="phoneError">
                                    {formErrors.phone}
                                </span>
                            </div>
                            <div className="col-md-6 mb-3">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="form-control border-black fs-4 rounded-0"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChanges} />
                                <span className="error-message" id="emailError">
                                    {formErrors.email}
                                </span>
                            </div>
                            <div className="col-12">
                                <textarea
                                    name="comment"
                                    placeholder="Comment"
                                    rows="5"
                                    className="form-control border-black fs-4 rounded-0"
                                    value={formData.comment}
                                    onChange={handleChanges}></textarea>
                                <span className="error-message" id="commentError">
                                    {formErrors.comment}
                                </span>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="submit mt-3">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Form;
