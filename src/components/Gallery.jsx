import React, { useEffect, useState } from 'react'
import Axios from 'axios';

// CSS
import '../assets/css/style.css';

// img
import galleryimg_1 from '../assets/img/gallery1.png';
import galleryimg_2 from '../assets/img/gallery2.png';
import galleryimg_3 from '../assets/img/gallery3.png';
import galleryimg_4 from '../assets/img/gallery4.png';
import galleryimg_5 from '../assets/img/gallery5.png';
import galleryimg_6 from '../assets/img/gallery6.png';
import galleryimg_7 from '../assets/img/gallery7.png';
import galleryimg_8 from '../assets/img/gallery8.png';
import galleryimg_9 from '../assets/img/gallery9.png';
import galleryimg_10 from '../assets/img/gallery10.png';
import galleryimg_11 from '../assets/img/gallery11.png';
import galleryimg_12 from '../assets/img/gallery12.png';

function Gallery() {

    const [datas, setData] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:4000/api/gallery/fetchgallary')
            .then((response) => {
                setData(response.data);
                console.log(datas)
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <>
            <header className="gallery_banner">
                <div className="container">
                    <div className="row">
                        <div className="gallery_heading">
                            <h1>Our Gallery</h1>
                        </div>
                    </div>
                </div>
            </header>

            <section id='food_img_gallery' className='pt-5'>
                <div className='container'>
                    <div className='row text-center'>
                        {datas.map((data, index) => (<div className='col-lg-3 col-sm-6' key={index}>
                            <div className={'gallery_img  '}>
                                <a href={`http://localhost:4000/Multer/${data.image}`} data-fancybox="gallery">
                                    <img src={`http://localhost:4000/Multer/${data.image}`} alt="img1" className='img-fluid rounded-3 mt-4' />
                                </a>
                            </div>
                        </div>))}
                       
                    </div>
                </div>
            </section>
        </>
    )
}

export default Gallery;