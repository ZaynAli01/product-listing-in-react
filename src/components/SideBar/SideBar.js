import React, { useState, useContext } from 'react'
import CartContext from '../../contextApi/CartContext'
import "./style.css"
import { useNavigate } from 'react-router-dom';

export default function SideBar() {

  const [activeIndex, setActiveIndex] = useState(1);
  const { isActive } = useContext(CartContext)
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('authToken')
    navigate('/')
  }

  const menuItems = [
    { name: "Home", icon: "fa-solid fa-house" },
    { name: "Product", icon: "fa-brands fa-product-hunt fa-lg" },
    { name: "Orders", icon: "fa-solid fa-cart-shopping", },
    { name: "Inbox", icon: "fa-solid fa-comment" },
    { name: "Setting", icon: "fa-solid fa-gear" },
    { name: "Logout", icon: "fa-solid fa-right-from-bracket" }
  ];

  return (
    <div className={`${isActive ? 'active' : ''} position-fixed  side-bar`
    }>
      <ul>
        <li>
          <span className="icon"><i className="fa-brands fa-apple fa-xl"></i></span>
          <a href="#" className='animate__animated animate__fadeInLeft'>FakeStore</a>
        </li>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => item.name === 'Logout' ? logOut() : setActiveIndex(index)}
          >
            <span className="icon"><i className={item.icon}></i></span>
            <a href="#" className='animate__animated animate__fadeInLeft'>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div >
  )

}
