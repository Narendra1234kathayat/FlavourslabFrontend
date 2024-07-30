import React from 'react';

// CSS
import '../assets/css/style.css'
import "../assets/css/btn_animation.css"

// img
import banner1 from '../assets/img/banner1.png';
import banner1_web from '../assets/img/banner1.webp';
import banner2 from '../assets/img/banner2.png';
import banner2_web from '../assets/img/banner2.webp';
import banner3 from '../assets/img/banner3.png';
import banner3_web from '../assets/img/banner3.webp';
import banner4 from '../assets/img/banner4.png';
import banner4_web from '../assets/img/banner4.webp';


function HomeBanners() {

    const handleScroll = () => {
        const yOffset = 700;
        window.scrollTo({
            top: yOffset,
            behavior: "smooth"
        });
    };

    return (
        <>
            <section id="banner">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <picture>
                                <source srcSet={banner1_web} type="image/webp" />
                                <source srcSet={banner1} type="image/png" />
                                <img src={banner1} className="img-fluid w-100" alt="Banner 1" />
                            </picture>
                            <div className="text-container">
                                <div className="foodiee" data-aos="fade-up" data-aos-duration="1500">
                                    <h1 className="mb-sm-3">Experience the <span className="text_outline"> real taste</span> of our Best <span className="text_outline">Dishes</span></h1>
                                    <h6>Delicious perfection in every single bite</h6>
                                    <a className="btn-theme btn-white fw-bold mt-lg-3" style={{cursor:"pointer"}} onClick={handleScroll}>
                                        Explore Now<span className="wave"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <picture>
                                <source srcSet={banner2_web} type="image/webp" />
                                <source srcSet={banner2} type="image/png" />
                                <img src={banner2} className="img-fluid w-100" alt="Event Banner" />
                            </picture>
                            <div className="text-container">
                                <h1 className="mb-sm-3">Taste the difference<span className="text_outline"> relish</span>  the moment.</h1>
                                <h6>Passion meets the plate, elevate your experience</h6>
                                <a className="btn-theme btn-white fw-bold mt-lg-3" style={{cursor:"pointer"}} onClick={handleScroll}>
                                    Explore Now<span className="wave"></span>
                                </a>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <picture>
                                <source srcSet={banner3_web} type="image/webp" />
                                <source srcSet={banner3} type="image/png" />
                                <img src={banner3} className="img-fluid w-100" alt="Foodlist Banner" />
                            </picture>
                            <div className="text-container">
                                <h1 className="mb-sm-3">Dine in style with our <span className="text_outline"> spotlight</span> Dishes</h1>
                                <h6>Innovation meets tradition in every dish</h6>
                                <a className="btn-theme btn-white fw-bold mt-lg-3" style={{cursor:"pointer"}} onClick={handleScroll}>
                                    Explore Now<span className="wave"></span>
                                </a>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <picture>
                                <source srcSet={banner4_web} type="image/webp" />
                                <source srcSet={banner4} type="image/png" />
                                <img src={banner4} className="img-fluid w-100" alt="Foodlist Banner" />
                            </picture>
                            <div className="text-container">
                                <h1 className="mb-sm-3">A world of flavors on your <span className="text_outline"> plate</span> / Dishes</h1>
                                <h6>Unveil extraordinary with our special creation</h6>
                                <a className="btn-theme btn-white fw-bold mt-lg-3" style={{cursor:"pointer"}} onClick={handleScroll}>
                                    Explore Now<span className="wave"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
        </>
    );
}

export default HomeBanners;
