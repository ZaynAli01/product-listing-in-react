import React, { useState } from 'react'
import CartContext from './CartContext'

export default function CartState(props) {

  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isActive, setIsActive] = useState(false)


  const handleHamburgerToggle = () => {
    setIsActive(!isActive)
  }

  const addQuantity = (product) => {
    const updatedProducts = carts.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCarts(updatedProducts);
    setTotalPrice(totalPrice + product.price);
  };

  const removeQuantity = (product) => {
    if (product.quantity > 1) {
      const updatedProducts = carts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCarts(updatedProducts);
      setTotalPrice(totalPrice - product.price);
    } else {
      const filteredProducts = carts.filter((item) => item.id !== product.id);
      setCarts(filteredProducts);
      setTotalPrice(totalPrice - product.price);
    }
  };

  const deleteProduct = (product) => {
    let updatedPrice = product.quantity * product.price
    let filteredProducts = carts.filter((item) => item.id !== product.id);
    setCarts(filteredProducts);
    setTotalPrice(totalPrice - updatedPrice);
  }

  const addToCart = (product) => {
    let index = carts.findIndex((element) => element.id === product.id);

    if (index !== -1) {
      const updatedCart = carts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCarts(updatedCart);
    } else {
      setCarts([...carts, { ...product, quantity: 1 }]);
    }

    setTotalPrice(totalPrice + product.price);
  };


  // Add to cart product api
  const addCartProduct = (product) => {
    let user = JSON.parse(localStorage.getItem('user'))

    fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        products: [{
          id: product.id,
        }]
      })
    })
      .then(res => res.json())
      .then(res => {

        setCarts(res.products)
      });
  }

  // Get cart user

  const getCartUser = () => {

    let user = JSON.parse(localStorage.getItem('user'))
    fetch(`https://dummyjson.com/carts/user/${user.id}`)
      .then(res => res.json())
      .then(res => {

      });
  }

  const productDetail = (product) => {

  }



  return (
    <CartContext.Provider value={{ addQuantity, removeQuantity, addToCart, carts, totalPrice, handleHamburgerToggle, isActive, deleteProduct, addCartProduct, getCartUser }} >
      {props.children}
    </ CartContext.Provider >)
}
