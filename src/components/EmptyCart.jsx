import React from 'react';

import {useNavigate} from 'react-router-dom';

// img
import empty1 from '../assets/img/u_14ffeb5495e9.jpg';

function EmptyCart() {

  const navigate = useNavigate();
  const navigateToHome = ()=>{
    navigate('/');
  }

  return (
    <>
      <section id='empty_cart' className='pb-lg-5 pb-0'>
        <div className='container'>
          <div className='row'>
            <div className='empty_cart_img text-center'>
              <img src={empty1} alt="empty_cart" className='img-fluid' />
              <h4 className='text-white mb-3'>Your cart is empty!</h4>
              <h6 className='text-color'>You can go to home page to view more food categories.</h6>
              <div className='text-center'>
                <a onClick={() => navigateToHome()} className="btn_exp mt-3 shadow rounded-0" style={{ cursor: 'pointer' }}>
                  Back to Home Page
                  <span className="wave"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EmptyCart;