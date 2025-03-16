import React from 'react'
import './style.css'

export default function Cart({ cartProducts, addQuantity, removeQuantity, totalPrice }) {

  return (
    <div className="d-flex justify-content-end">
      < div className="btn-group" >
        <button type="button" className="btn btn-primary dropdown-toggle add-items-cart animate__animated animate__fadeInDown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"
        >
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartProducts.length}
            <span className="visually-hidden">unread messages</span>
          </span>
          <i className="fa-solid fa-cart-plus dropdown-item"></i>
        </button>
        <ul className="dropdown-menu">
          {cartProducts.map((item, index) => (
            < li key={index} className="dropdown-item d-flex align-items-center border-bottom" >
              <div className="dropdown-img-box">
                <img src={item.image} alt="" />
              </div>
              <div className="product-content">
                <p><b>{item.category}</b></p>
                <p className="quantity ms-3"> <span onClick={() => removeQuantity(item)}>-</span> {item.quantity} <span onClick={() => addQuantity(item)}>+</span></p>
              </div>
            </li>
          ))}
          <p className='ms-3 mt-2 mb-0 text-success'><b>Total Price : {Number(totalPrice.toFixed(2))}</b></p>
        </ul>
      </div >
    </div>
  )
}
