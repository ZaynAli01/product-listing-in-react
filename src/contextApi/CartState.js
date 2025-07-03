import React, { useState } from 'react'
import CartContext from './CartContext'

export default function CartState(props) {

  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isActive, setIsActive] = useState(false)


  const handleHamburgerToggle = () => {
    setIsActive(!isActive)
  }

  const addQuantity = (product) => {
    const updatedProducts = cartProducts.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartProducts(updatedProducts);
    setTotalPrice(totalPrice + product.price);
  };

  const removeQuantity = (product) => {
    if (product.quantity > 1) {
      const updatedProducts = cartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartProducts(updatedProducts);
      setTotalPrice(totalPrice - product.price);
    } else {
      const filteredProducts = cartProducts.filter((item) => item.id !== product.id);
      setCartProducts(filteredProducts);
      setTotalPrice(totalPrice - product.price);
    }
  };

  const deleteProduct = (product) => {
    let updatedPrice = product.quantity * product.price
    let filteredProducts = cartProducts.filter((item) => item.id !== product.id);
    setCartProducts(filteredProducts);
    setTotalPrice(totalPrice - updatedPrice);
  }

  const addToCart = (product) => {
    let index = cartProducts.findIndex((element) => element.id === product.id);

    if (index !== -1) {
      const updatedCart = cartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartProducts(updatedCart);
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
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
        setTotalPrice(totalPrice + res.products[0].price);
        setCartProducts([...cartProducts, ...res.products])
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
    <CartContext.Provider value={{ addQuantity, removeQuantity, addToCart, cartProducts, totalPrice, handleHamburgerToggle, isActive, deleteProduct, addCartProduct, getCartUser }} >
      {props.children}
    </ CartContext.Provider >)
}
