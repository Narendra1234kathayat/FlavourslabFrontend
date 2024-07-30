import React, { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { decitem, incitem, clearcart } from "../store/slices/CartSlice";
import Axios from 'axios';
import EmptyCart from "./EmptyCart";
import { useNavigate } from 'react-router-dom';
import table_number from "../assets/img/table-number-img.png";

import Swal from 'sweetalert2';


// img
import cartbag from "../assets/img/cartbag.png";
import cartbagpng from "../assets/img/cartbag.png";
import veglogo from "../assets/img/Veg_logo.png";
import nonveglog from "../assets/img/Non-Veg logo.png";
import celebration_img from "../assets/img/discount.jpg";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// CSS
import '../assets/css/style.css';

function Cart() {
    const [coupon, setCoupon] = useState('');
    const [coupondata, setCoupondata] = useState();
    const [tableNumber, setTableNumber] = useState();
   

    const navigate = useNavigate();

    const dispatch = useDispatch();
    let cartitem = useSelector((state) => state.cart);
    const totalPrice = cartitem.reduce((acc, curr) => acc + (curr.productprice * curr.quantity), 0);
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await Axios.post(
                    "http://localhost:4000/api/auth/getuser"
                );
                if (response) {
                    const user = response.data;
                } else {
                   
                    console.log("Failed to fetch user data");
                }
            } catch (error) {
                navigate('/emptycart')
                
            }
        };

        getUser(); 
    }, []); 

    const orderData = {
        orderproducts: cartitem.map((item) => ({
            productname: item.productname,
            productprice: item.productprice * item.quantity,
            quantity: item.quantity,
            tableNumber: item.tableNumber
        })),
        totalprice: coupondata ? totalPrice * (100 - coupondata.percentoff) / 100 : totalPrice,
        tableNumber: tableNumber
    };

    const handleinc = (product) => {
        dispatch(incitem(product))
    }

    const handledec = (product) => {
        dispatch(decitem(product))
    }

    Axios.defaults.withCredentials = true;

    const handleorder = async () => {
        if (!tableNumber) {
            Swal.fire({
                html: `<b class="text-danger">Kindly select a table number to place your order!</b>`,
                imageUrl: table_number,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "table-number-img"
            });
        }
        try {
            const response = await Axios.post('http://localhost:4000/api/orders/order', orderData)
            if (response.data) {
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your Order has been placed Successfully!'
                }).then(() => {
                    dispatch(clearcart());
                    navigate("/");
                });
            }
            else {

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleApply = async () => {
        if (!coupon.trim()) {
            alert("Please enter a valid coupon code.");
            return;
        }

        try {
            const res = await Axios.post('http://localhost:4000/api/coupon/verifycoupon', { coupon });
            console.log("Response from server:", res);

            if (res.data.error === "no coupon found") {
                alert("Wrong coupon. Please enter a valid coupon code.");
            } else {
                setCoupondata(res.data);
                // alert("Coupon Applied Successfully!");

                // Show Bootstrap Toast
                const toastLiveExample = document.getElementById('liveToast');
                const toastBootstrap = new bootstrap.Toast(toastLiveExample);
                toastBootstrap.show();
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Oops! Coupon does not exists.");
        }
    };


    return (
        <>
            {cartitem.length === 0 ? (<EmptyCart />) : (<section className="cart">
                <div className="container">
                    <div className="row">
                        <h1 className="text-center order_summary">
                            Your Order Summary
                            <picture>
                                <source srcSet={cartbagpng} type="image/webp" />
                                <source srcSet={cartbag} type="image/png" />
                                <img src={cartbag} className="img-fluid mx-4 my-auto" alt="icon" />
                            </picture>
                        </h1>
                        <div className="row justify-content-center pe-0">
                            <div className="col-md-10">
                                {cartitem.map((cartproduct, index) => (
                                    <div className="col-12 d-flex justify-content-between cartitem my-md-5 my-4" key={index}>
                                        <div className="productname d-flex ms-2 align-item-center my-1">
                                            {cartproduct.type === "Veg" ? (
                                                <img src={veglogo} className="img-fluid me-2 mb-3" style={{ width: "30px", height: "30px" }} alt="Veg logo" />
                                            ) : (
                                                <img src={nonveglog} className="img-fluid me-2 mb-3" style={{ width: "30px", height: "30px" }} alt="non veg logo" />
                                            )}
                                            <div className="pname mx-md-4 mx-2 mx-1">
                                                <p>{cartproduct.productname}</p>
                                                <p className="price">₹ {cartproduct.productprice * cartproduct.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="add my-auto bg-black me-md-5 p-1 d-flex rounded-2">
                                            <FontAwesomeIcon
                                                icon={faCircleMinus}
                                                style={{ color: "#cca77b", cursor: "pointer" }}
                                                className="mx-1 my-auto fs-4"
                                                onClick={() => handledec(cartproduct)}
                                            />
                                            <span className="text-white mx-2 fs-4">{cartproduct.quantity}</span>
                                            <FontAwesomeIcon
                                                icon={faCirclePlus}
                                                style={{ color: "#cca77b", cursor: "pointer" }}
                                                className="mx-1 my-auto fs-4"
                                                onClick={() => handleinc(cartproduct)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="coupon my-md-5 my-4">
                                    <input className="form-control p-md-4 p-2 fw-medium" type="text" placeholder="Enter Coupon code" aria-label="" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                    <button type="button" onClick={handleApply} className="btn btn-success">Apply</button>
                                </div>


                                <div className="col-12 my-md-5 my-4">
                                    <select
                                        name="table"
                                        id="table"
                                        className="form-control fs-4 forms bg-black text-white rounded-5"
                                        value={tableNumber} onChange={(e) => setTableNumber(e.target.value)}>
                                        <option value="">-- Select Table Number --</option>
                                        <option className="bg-black text-white" value="tb-1">tb-1</option>
                                        <option className="bg-black text-white" value="tb-2">tb-2</option>
                                        <option className="bg-black text-white" value="tb-3">tb-3</option>
                                        <option className="bg-black text-white" value="tb-4">tb-4</option>
                                        <option className="bg-black text-white" value="tb-5">tb-5</option>
                                        <option className="bg-black text-white" value="tb-6">tb-6</option>
                                        <option className="bg-black text-white" value="tb-7">tb-7</option>
                                        <option className="bg-black text-white" value="tb-8">tb-8</option>
                                        <option disabled>───────────</option>
                                        <option className="bg-black text-white" value="tt-9">tt-9</option>
                                        <option className="bg-black text-white" value="tt-10">tt-10</option>
                                        <option className="bg-black text-white" value="tt-11">tt-11</option>
                                        <option className="bg-black text-white" value="tt-12">tt-12</option>
                                        <option className="bg-black text-white" value="tt-13">tt-13</option>
                                        <option className="bg-black text-white" value="tt-14">tt-14</option>
                                        <option className="bg-black text-white" value="tt-15">tt-15</option>
                                    </select>
                                </div>


                                <div className="total p-4 d-md-flex justify-content-between ">
                                    <div>
                                        <h2>₹ {coupondata ? totalPrice * (100 - coupondata.percentoff) / 100 : totalPrice}</h2>
                                        <p><i>Extra charges may apply</i></p>
                                    </div>
                                    <div className="my-auto text-center">
                                        <button type="button" onClick={handleorder} className="px-md-4 px-5 place_order_btn rounded-2">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="toast-container position-fixed bottom-0 end-0 p-3">
                            <div id="liveToast" className="toast bg-black" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-header">
                                    <img src={celebration_img} className="rounded me-2 img-fluid" alt="..." />
                                    <strong className="me-auto">YAY!</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div className="toast-body text-white">
                                    <h6>Coupon Applied Successfully! 🎉</h6>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>)}
        </>
    );
}

export default Cart;
