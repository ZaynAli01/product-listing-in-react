import React from 'react'
import './style.css'
import img from './dummy-man-570x570-1.png'
import Carts from '../Card/Cards'

export default function NavBar() {

  return (
    <>
      <div className='nav-bar  d-flex justify-content-between align-items-center'>
        <div data-aos="fade-down" className="hamburger animate__animated animate__fadeInDown"><i className="fa-solid fa-bars"></i></div>
        <div data-aos="fade-down" className="search-box animate__animated animate__fadeInDown">
          <input type="text" placeholder='Search Here' />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div data-aos="fade-down" className="img-box animate__animated animate__fadeInDown ">
          <img src={img} alt="" />
        </div>
      </div>
      <Carts />
    </>
  )


}
