import React, { useContext } from 'react'
import Cart from '../Cart/Cart'
import './style.css'
import img from './dummy-man-570x570-1.png'
import CartContext from '../../contextApi/CartContext'

export default function NavBar() {

  const { handleHamburgerToggle, isActive } = useContext(CartContext)

  return (
    <div className={`${isActive ? 'active' : ''} nav-bar d-flex justify-content-between align-items-center`}>
      <div onClick={handleHamburgerToggle} className="hamburger animate__animated animate__fadeInDown"><i className="fa-solid fa-bars"></i></div>
      <div className="search-box animate__animated animate__fadeInDown">
        <input type="text" placeholder='Search Here' />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="cart-img-box">
        <Cart />
        <div className="img-box animate__animated animate__fadeInDown ">
          <img src={img} alt="" />
        </div>
      </div>
    </div >
  )

}
