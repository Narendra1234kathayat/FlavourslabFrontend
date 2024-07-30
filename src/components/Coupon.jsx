import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

function Coupon() {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
    };

    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await Axios.get(
                    "http://localhost:4000/api/coupon/fetchcoupon"
                );
                console.log(res.data);
                if (res.status === 200) {
                    setCoupons(res.data);
                } else {
                    console.log("No coupons available");
                }
            } catch (error) {
                console.error("Error fetching coupons:", error);
            }
        };
        fetchdata();
    }, []);

    const handleCopy = (code) => {
        const inputElement = document.getElementById(code);

        if (inputElement) {
            inputElement.select();
            document.execCommand("copy");

            console.log('Text copied to clipboard');
        }
    };

    return (
        <>
            <header className="coupon_banner">
                <div className="container">
                    <div className="row">
                        <div className="coupon_heading">
                            <h1>Available Coupons</h1>
                        </div>
                    </div>
                </div>
            </header>

            <section className="coupons pt-5">
                <div className="container">
                    <div className="row">
                        {coupons.map((coupon, index) => (
                            <div className="col-lg-4 col-md-6 my-3" key={index}>
                                <div className="couponss p-4">
                                    <div className="coupon-card">
                                        <h4>{coupon.percentoff}% off</h4>
                                        <p className="text-white">On first order</p>
                                    </div>
                                    <div className="coupon-detail">
                                        <input
                                            className="form-control"
                                            readOnly
                                            id={`code${index}`} // Change the ID to be unique
                                            type="text"
                                            value={coupon.couponcode}
                                        />
                                        <button
                                            className="copybtn"
                                            onClick={() => handleCopy(`code${index}`)} // Pass the unique ID
                                        >
                                            <FontAwesomeIcon icon={faCopy} className="text-white" />
                                            &nbsp;Copy
                                        </button>
                                        <ul className="ps-2">
                                            <li>{`${formatDate(coupon.startingdate)} - ${formatDate(
                                                coupon.expirydate
                                            )}`}</li>
                                            <li>For all products</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Coupon;
