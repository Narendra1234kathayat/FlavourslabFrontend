import React from 'react'

// img 
import error_img from '../assets/img/404_error.png';

import { useNavigate } from 'react-router-dom';

function Error() {

    const navigate = useNavigate();
    const navigateTohome = () => {
        navigate('/');
    };

    return (
        <>
            <div className='error_page bg-gradient'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 mb-5 mb-md-0'>
                            <div className='error_image'>
                                <picture>
                                    <source srcSet={error_img} type="image/webp" />
                                    <source srcSet={error_img} type="image/png" />
                                    <img src={error_img} className="img-fluid text-center" alt="icon" />
                                </picture>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='error_content'>
                                <div className='text-center text-md-start mb-3 buttons'>
                                    <button type="button" className="btn btn-outline-primary px-4 py-2" onClick={navigateTohome}> Back to home</button>
                                </div>
                                <h1 className='mb-3'>Oops...</h1>
                                <h3 className='mb-3'>Page Not Found!</h3>
                                <p className='mb-3'><i>
                                    This is a 404 page and we think it's fairly clear
                                    You aren't going to find what you're looking for here
                                    But we know you're hungry, so don't fret or rage
                                    Hit that big blue button to go back to our homepage.</i></p>
                                <div className='text-center text-md-start buttonss'>
                                    <button type="button" className="btn btn-outline-primary px-4 py-2" onClick={navigateTohome}> Back to home</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;