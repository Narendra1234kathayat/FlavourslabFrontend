import React, { useEffect, useState } from "react";
import Axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

function Order() {
    const [orders, SetOrder] = useState([]);

    useEffect(() => {
        Axios.get('https://flavourslabbackend.onrender.com/api/orders/fetchorder')
            .then((response) => {
                if (response.data) {
                    SetOrder(response.data);
                } else {
                    console.log("Invalid data format received from server:", orders);
                }
            })
            .catch((err) => console.error("Error fetching orders:", err));
    }, []);

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    return (
        <section id="past_orders">
            <div className="container">
                <h1 className="text-white mb-5 text-center">Past Orders <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: "#c39f75" }} /></h1>
                <div className="row">
                    {!orders.length ? (<h1 className="no-orders">No orders taken</h1>)
                        : (
                            orders.map((order, index) => (
                                <div className="col-lg-12 col-sm-6 d-flex d-lg-block justify-content-center mb-4" key={index}>
                                    <div className="card h-100 back-color shadow-lg rounded-4">
                                        <div className="card-body">
                                            <p className="card-text"><span>Order ID:</span> <span className="card-title"> #{order._id}</span></p>
                                            <p className="card-text">Date: {new Date(order.date).toLocaleString('en-US', options)} <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#24CC6F' }} /></p>
                                            <p className="card-text">Total Items:</p>
                                            <ul className="list-group">
                                                {order.orderproducts.map((product, idx) => (
                                                    <li className="list-group-item text-white" key={idx}>
                                                        {product.productname} - Quantity: {product.quantity} - Price: {product.productprice}
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="card-text mt-3">Total Paid:  <span className="card-title">₹ {order.totalprice}</span></p>
                                        </div>
                                    </div>
                                </div>
                            )))
                    }
                </div>
            </div>
        </section>
    );
}

export default Order;
