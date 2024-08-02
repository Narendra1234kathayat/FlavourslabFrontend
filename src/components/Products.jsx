import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCart } from "../store/slices/CartSlice";

// img
import veglogo from "../assets/img/Veg_logo.png";
import nonveglogo from "../assets/img/Non-Veg logo.png"
import egglogo from "../assets/img/egg logo.png"

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// CSS
import '../assets/css/btn_animation.css'

function Products() {

    const { type } = useParams(); // Use useParams hook to get URL parameters
    const [products, setProducts] = useState([]); // State to store products
    const [productname, setProductname] = useState('');
    const dispatch = useDispatch();

    // Backend code

    useEffect(() => {
        Axios.defaults.withCredentials = true;
        const fetchProducts = async () => {
            try {
                // Make API request to fetch products based on type
                const response = await Axios.post(
                    `https://flavourslabbackend.onrender.com/api/product/fetchproducts/${type}`
                );
                setProducts(response.data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [type]);

    const handleCart = async (product) => {

        try {
            const response = await Axios.get(
                "https://flavourslabbackend.onrender.com/api/auth/verify",
                {
                    headers:{
                        "authToken":localStorage.getItem("authToken")
                    }
                }
            );
            console.log(response.data)
            // console.log(response)
            if (response.data.status) {
                const user = response.data;
                // setUserData(user);

                dispatch(setCart(product));
                const toastLiveExample = document.getElementById('liveToast');
                const toastBootstrap = new bootstrap.Toast(toastLiveExample);
                toastBootstrap.show();
                setProductname(product.productname);

            } else {
                alert("kindly login")

            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <section className="products">
                <div className="container">
                    <div className="row">
                        {products.map((product, index) => (
                            <div className="col-lg-4 col-md-6 col-12 my-3" key={index}>
                                <div className="product p-3 text-white rounded-4 h-100">
                                    <div className="productname d-flex align-items-center">
                                        {/* <img
                                            src={product.type === "Veg" ? veglogo : nonveglogo} // Use nonveglogo
                                            className="img-fluid me-2 mb-3"
                                            style={{ width: "30px", height: "30px" }}
                                            alt={product.type === "Veg" ? "veg logo" : "non-veg logo"} // Alt text corrected
                                        /> */}
                                        {product.type.toLowerCase() ==="veg" && <img src={veglogo}  className="img-fluid me-2 mb-3" style={{ width: "30px", height: "30px" }} alt="veg"/>}
                                        {product.type.toLowerCase()==="non veg" && <img src={nonveglogo}  className="img-fluid me-2 mb-3" style={{ width: "30px", height: "30px" }} alt="veg"/>}
                                        {product.type.toLowerCase()==="egg" && <img src={egglogo}  className="img-fluid me-2 mb-3" q style={{ width: "30px", height: "30px" }} alt="veg"/>}
                                        <h5>{product.productname}</h5>
                                    </div>
                                    <div className="productdetail">
                                        <p>{product.productdesc}</p>
                                    </div>
                                    <div className="productprice">
                                        <h5>₹{product.productprice}</h5>
                                    </div>
                                    <br />
                                    <div className="text-center">
                                        <button className="Addtocart px-5 py-2 shadow rounded-1" onClick={() => handleCart(product)}>
                                            <h5>
                                                Add
                                                <FontAwesomeIcon
                                                    icon={faCirclePlus}
                                                    style={{ color: "#c39f75" }}
                                                    className="mx-2 my-auto fs-5 icons"
                                                />
                                            </h5>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                       

                    </div>
                </div>
            </section>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <img src={veglogo} className="rounded me-2" alt="veg logo" /> {/* Fixed alt text */}
                        <strong className="me-auto">{`${productname.toUpperCase()}`}</strong>
                        {/* <small>11 mins ago</small> */}
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        item added to cart
                    </div>
                </div>
            </div>

        </>
    );
}

export default Products;