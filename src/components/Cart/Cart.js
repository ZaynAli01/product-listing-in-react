import React, { useContext } from 'react'
import './style.css'
import CartContext from '../../contextApi/CartContext'

export default function Cart() {

  const a = useContext(CartContext)

  return (
    <div className="d-flex justify-content-end">
      < div className="btn-group" >
        <button type="button" className="btn btn-primary dropdown-toggle add-items-cart animate__animated animate__fadeInDown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"
        >
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {a.addToCartProducts.length}
            <span className="visually-hidden">unread messages</span>
          </span>
          <i className="fa-solid fa-cart-plus dropdown-item"></i>
        </button>
        <ul className="dropdown-menu">
          {a.addToCartProducts.map((item, index) => (
            < li key={index} className="dropdown-item d-flex align-items-center border-bottom" >
              <div className="dropdown-img-box">
                <img src={item.image} alt="" />
              </div>
              <div className="product-content">
                <p><b>{item.category}</b></p>
                <p className="quantity ms-3"> <span onClick={() => a.removeQuantity(item)}>-</span> {item.quantity} <span onClick={() => a.addQuantity(item)}>+</span></p>
              </div>
            </li>
          ))}
          <p className='ms-3 mt-2 mb-0 text-success'><b>Total Price : {Number(a.totalPrice.toFixed(2))}</b></p>
        </ul>
      </div >
    </div>
  )
}
