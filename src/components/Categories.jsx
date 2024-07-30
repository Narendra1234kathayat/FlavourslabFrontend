import React, { useEffect, useState } from "react";
import Axios from "axios";

// CSS
import '../assets/css/style.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

// Slick Carousel
import Slider from 'react-slick';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';

import recommended_food from '../assets/img/recommended_food.png';

import recommended1 from '../assets/img/recommended1.png';
import recommended2 from '../assets/img/recommended2.png';
import recommended3 from '../assets/img/recommended3.png';
import recommended4 from '../assets/img/recommended4.png';

import gallery1 from '../assets/img/home_gallery1.png';
import gallery2 from '../assets/img/home_gallery2.png';
import gallery3 from '../assets/img/home_gallery3.png';
import gallery4 from '../assets/img/home_gallery4.png';
import gallery5 from '../assets/img/home_gallery5.png';

import { useNavigate } from 'react-router-dom';

function Categories() {

    const [alldata, setAlldata] = useState([]);
    const [datas, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(
        localStorage.getItem("selectedCategory") || "all"
    );

    const handlesearch = (e) => {
        const searchTerm = e.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive search
        setSearch(searchTerm);
    };

    const handleFilter = (category) => {
        setSelectedCategory(category);
        localStorage.setItem("selectedCategory", category);
    };

    // Backend code

    useEffect(() => {
        Axios.get("http://localhost:4000/api/category/fetchcategory")
            .then((response) => {
               
                const shuffledData = response.data.sort(() => Math.random() - 0.5);
               
                setData(shuffledData);
                setAlldata(shuffledData);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        let filteredData = alldata;

        // Apply category filter
        if (selectedCategory !== "all") {
            filteredData = filteredData.filter((d) => d.type.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Apply search filter
        if (search !== "") {
            filteredData = filteredData.filter((data) =>
                data.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setData(filteredData);
    }, [search, selectedCategory, alldata]);


    // slick carousel - sliding cards automatically & in responsive manner

    const owlCarouselOptions = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        autoplay: true,
        autoplayTimeout: 3000,
    };

    // Redirecting to gallery.jsx component, after clicking 'Explore Gallery' button

    const navigate = useNavigate();
    const navigateTogallery = () => {
        navigate('/gallery');
    };

    const handleproduct = (type) => {
        navigate(`/products/${type}`);
    };

    useEffect(() => {
        // Check if there is a selected category stored in local storage
        const storedCategory = localStorage.getItem("selectedCategory");

        if (storedCategory) {
            setSelectedCategory(storedCategory);

            let filterData;

            if (storedCategory === "Veg") {
                filterData = alldata.filter((d) => d.type.toLowerCase() === "veg");
            } else if (storedCategory === "Egg") {
                filterData = alldata.filter((d) => d.type.toLowerCase() === "egg");
            } else if (storedCategory === "Non Veg") {
                filterData = alldata.filter((d) => d.type.toLowerCase() === "non veg");
            } else {
                // If the category is not recognized, display all data
                filterData = alldata;
            }

            setData(filterData);
        } else {
            // If no category is stored, display all data
            setData(alldata);
        }
    }, [alldata]);

    return (
        <>

            {/* Food type */}

            <section id='categories' className='pt-5 py-lg-5'>
                <div className='container'>
                    <div className='row cate_wrapper rounded-3 align-items-center py-3 shadow mb-3'>
                        <div className='col-lg-5 col-md-12 justify-content-lg-start justify-content-center d-flex align-items-center px-4'>
                            <p className='cate_heading mb-0 me-4'>Categories</p>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2 cate_w" type="search" placeholder="Search" aria-label="Search" onChange={handlesearch} />
                                <button className="btn btn-success" type="submit">Search</button>
                            </form>
                        </div>

                        <div className='col-lg-7 col-md-6 mt-4 mt-md-0 justify-content-end d-flex justify-content-lg-end justify-content-center categoriies'>

                            <div className={`veg me-4 cate_select rounded-3 ${selectedCategory === "all" ? "selected" : ""}`} onClick={() => handleFilter("all")}>
                                <p className='mb-0 p-2'>
                                    <span className='text-white px-2' id='all'>All</span>
                                </p>
                            </div>

                            <div className={`veg me-4 cate_select rounded-3 ${selectedCategory === "Veg" ? "selected" : ""}`} onClick={() => handleFilter("Veg")}>
                                <p className='mb-0 p-2'>
                                    <FontAwesomeIcon icon={faCircle} style={{ color: 'green' }} /> &nbsp;
                                    <span className={`text-white ${selectedCategory === "Veg" ? "selected-text" : ""}`} id='veg'>Veg</span>
                                </p>
                            </div>

                            <div className={`veg me-4 cate_select rounded-3 ${selectedCategory === "Egg" ? "selected" : ""}`} onClick={() => handleFilter("Egg")}>
                                <p className='mb-0 p-2'>
                                    <FontAwesomeIcon icon={faCircle} style={{ color: '#B18000' }} /> &nbsp;
                                    <span className='text-white' id='egg'>Eggs</span>
                                </p>
                            </div>

                            <div className={`veg me-4 cate_select rounded-3 ${selectedCategory === "Non Veg" ? "selected" : ""}`} onClick={() => handleFilter("Non Veg")}>
                                <p className='mb-0 p-2'>
                                    <FontAwesomeIcon icon={faCircle} style={{ color: 'red' }} /> &nbsp;
                                    <span className='text-white' id='non_veg'>Non Veg</span>
                                </p>
                            </div>
                        </div>

                        <div className='col-12 mt-3 justify-content-end d-flex justify-content-lg-end justify-content-center catego'>

                            <div className="row">
                                <div className="col-6">
                                    <div className={`veg me-lg-4 me-0 my-2 my-lg-0 cate_select rounded-3 ${selectedCategory === "all" ? "selected" : ""}`} onClick={() => handleFilter("all")}>
                                        <p className='mb-0 p-2'>
                                            <span className='text-white px-2' id='all'>All</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className={`veg me-lg-4 me-0 my-2 my-lg-0 cate_select rounded-3 ${selectedCategory === "Veg" ? "selected" : ""}`} onClick={() => handleFilter("Veg")}>
                                        <p className='mb-0 p-2'>
                                            <FontAwesomeIcon icon={faCircle} style={{ color: 'green' }} /> &nbsp;
                                            <span className={`text-white ${selectedCategory === "Veg" ? "selected-text" : ""}`} id='veg'>Veg</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className={`veg me-lg-4 me-0 my-2 my-lg-0 cate_select rounded-3 ${selectedCategory === "Non Veg" ? "selected" : ""}`} onClick={() => handleFilter("Non Veg")}>
                                        <p className='mb-0 p-2'>
                                            <FontAwesomeIcon icon={faCircle} style={{ color: 'red' }} /> &nbsp;
                                            <span className='text-white' id='non_veg'>Non Veg</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className={`veg me-lg-4 me-0 my-2 my-lg-0 cate_select rounded-3 ${selectedCategory === "Egg" ? "selected" : ""}`} onClick={() => handleFilter("Egg")}>
                                        <p className='mb-0 p-2'>
                                            <FontAwesomeIcon icon={faCircle} style={{ color: '#B18000' }} /> &nbsp;
                                            <span className='text-white' id='egg'>Eggs</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <p className='cate_head text-center py-3'>Categories</p>
                </div>
            </section>

            {/* All categories */}

            <section id='all_cate_food' className='mb-5 pt-lg-0 pt-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3 col-sm-6 col-6'>
                            <div className='border rounded-3 foodie' onClick={() => (handleproduct('recommended'))}>
                                <div className='text-center'>
                                    <img src={recommended_food} alt="category1" className='img-fluid' />
                                    <p className='text-white fs-5'>Recommended</p>
                                </div>
                            </div>
                        </div>

                        {datas.map((data, index) => (
                            <div className="col-lg-3 col-sm-6 col-6" key={index} onClick={() => (handleproduct(data.name))}>
                                <div className="border rounded-3 foodie">
                                    <div className="text-center">
                                        <img
                                            src={`http://localhost:4000/Multer/${data.image}`}
                                            alt="category1"
                                            className="img-fluid"
                                        />
                                        <p className="text-white fs-5">{data.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}



                    </div>
                </div>
            </section>

            {/* Recommended Food */}

            <section id="recommended_food" className='mb-5'>
                <div className='container'>
                    <h3 className='reco_food text-center mb-5'>Recommended Food</h3>
                    <div className='row justify-content-center'>
                        <Slider {...owlCarouselOptions}>
                            <div className='d-flex justify-content-center'>
                                <div className="card border-0 shadow" style={{ width: "18rem" }}>
                                    <img src={recommended1} className="card-img-top" alt="img" />
                                    <div className="card-body">
                                        <h5 className="card-title">Margherita Pizza</h5>
                                        <p className="card-text">A crispy thin crust plays host to a harmony of zesty tomato sauce, melted mozzarella, and a medley of premium toppings.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="card border-0 shadow" style={{ width: "18rem" }}>
                                    <img src={recommended2} className="card-img-top" alt="img" />
                                    <div className="card-body">
                                        <h5 className="card-title">Veg Mix Grill Sizzler</h5>
                                        <p className="card-text">A crispy thin crust plays host to a harmony of zesty tomato sauce, melted mozzarella, and a medley of premium toppings.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="card border-0 shadow" style={{ width: "18rem" }}>
                                    <img src={recommended3} className="card-img-top" alt="img" />
                                    <div className="card-body">
                                        <h5 className="card-title">Chicken Gizzard</h5>
                                        <p className="card-text">A crispy thin crust plays host to a harmony of zesty tomato sauce, melted mozzarella, and a medley of premium toppings.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="card border-0 shadow" style={{ width: "18rem" }}>
                                    <img src={recommended4} className="card-img-top" alt="img" />
                                    <div className="card-body">
                                        <h5 className="card-title">Cappuccino</h5>
                                        <p className="card-text">A crispy thin crust plays host to a harmony of zesty tomato sauce, melted mozzarella, and a medley of premium toppings.</p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>

            {/* Gallery */}

            <section id='gallery_photo'>
                <div className='container'>
                    <h3 className='reco_food text-center mb-5'>Our Gallery</h3>
                    <div className='row'>
                        <div className='col-lg-3 text-center'>
                            <div className='row'>
                                <div className='col-lg-12 pb-4'>
                                    <img src={gallery1} className="img-fluid w-100 rounded-3" alt="img" />
                                </div>
                                <div className='col-lg-12 pb-4'>
                                    <img src={gallery2} className="img-fluid w-100 rounded-3" alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 text-center pt-4 pb-4 pt-lg-0 pb-lg-0'>
                            <img src={gallery3} className='img-fluid w-100 rounded-3' alt="img" />
                        </div>
                        <div className='col-lg-3 text-center'>
                            <div className='row'>
                                <div className='col-lg-12 pb-4'>
                                    <img src={gallery4} className="img-fluid w-100 rounded-3" alt="img" />
                                </div>
                                <div className='col-lg-12 pb-4'>
                                    <img src={gallery5} className="img-fluid w-100 rounded-3" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <a onClick={() => navigateTogallery()} className="btn_exp mt-3" style={{ cursor: 'pointer' }}>
                            Explore Gallery
                            <span className="wave"></span>
                        </a>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Categories;