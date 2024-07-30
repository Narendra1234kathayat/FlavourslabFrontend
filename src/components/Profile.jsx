import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FetchUser } from '../store/slices/Userslice';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { data: userData, status } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(FetchUser());
    }, []);

    // Extracting user data
    const { name, email, number, date } = userData;

    const capitalizeFirstLetter = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        const handleVerify = () => {
            Axios.get("http://localhost:4000/api/auth/verify")
                .then((res) => {
                    // console.log(res.data.status);
                    if (res.data.status) {
                    } else {
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        handleVerify();
    }, []);

    return (
        <section id='user_details'>
            <h1 className='text-center mb-4 text-color'>User Profile <FontAwesomeIcon icon={faAddressCard} style={{ color: "#c39f75" }} /></h1>
            <div className='container'>
                <div className="row justify-content-center">
                    {status === 'loading' && (
                        <div className="col-12 text-center">
                            <p>Loading...</p>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="col-12 text-center text-white">
                            <p>Error fetching user! Kindly login with your valid email and password</p>
                        </div>
                    )}
                    <div className="col-lg-10">
                        <table className="table table-bordered table-hover table-striped">
                            <tbody>
                                <tr>
                                    <th scope="row">Username</th>
                                    <td>{capitalizeFirstLetter(name)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Number</th>
                                    <td colSpan="2">{number}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Account Created</th>
                                    <td colSpan="2">{new Date(date).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
