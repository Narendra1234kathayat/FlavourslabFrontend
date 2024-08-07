// import bootstarp
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error.jsx';
import Home from './components/Home.jsx';
import Contactus from './components/Contactus.jsx';
import Gallery from './components/Gallery.jsx';
import Cart from './components/Cart.jsx';
import ScrollToTop from "react-scroll-to-top";
import Coupon from './components/Coupon.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Forgotpassword from './components/Auth/Forgotpassword.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CompoRefresh from './components/CompoRefresh.jsx';
import Product from './components/Products.jsx';
import Resetpassword from './components/Auth/Resetpassword.jsx';
import Profile from './components/Profile.jsx';
import EmptyCart from './components/EmptyCart.jsx';
import Order from './components/Order.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <CompoRefresh />
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='*' element={<Error />} />
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/coupon' element={<Coupon />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contactus' element={<Contactus />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/products/:type' element={<Product />} />
          <Route path='reset-password/:token' element={<Resetpassword />} />
          <Route path='/emptycart' element={<EmptyCart />} />
          <Route path='/order' element={<Order />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;