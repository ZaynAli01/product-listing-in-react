import React, { useState } from 'react'
import NavBar from "../NavBar/NavBar"
import "./style.css"

export default function SideBar() {
  const [activeIndex, setActiveIndex] = useState(1);


  const menuItems = [
    { name: "Home", icon: "fa-solid fa-house" },
    { name: "Product", icon: "fa-solid fa-user" },
    { name: "Orders", icon: "fa-solid fa-cart-shopping" },
    { name: "Inbox", icon: "fa-solid fa-comment" },
    { name: "Setting", icon: "fa-solid fa-gear" },
    { name: "Logout", icon: "fa-solid fa-right-from-bracket" }
  ];



  return (
    <>
      <div className="position-fixed  side-bar">
        <ul>
          <li>
            <a href="#" className='animate__animated animate__fadeInLeft'><span className="icon"><i className="fa-brands fa-apple"></i></span>FakeStore</a>
          </li>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => setActiveIndex(index)}
            >
              <a href="#" className='animate__animated animate__fadeInLeft'>
                <span className="icon"><i className={item.icon}></i></span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <NavBar />
    </>
  )
}
