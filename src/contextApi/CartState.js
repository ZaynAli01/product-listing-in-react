import React, { useState } from 'react'
import CartContext from './CartContext'

export default function CartState(props) {

  const [addToCartProducts, setAddToCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isActive, setIsActive] = useState(false)


  const handleHamburgerToggle = () => {
    setIsActive(!isActive)
  }

  const addQuantity = (product) => {
    const updatedProducts = addToCartProducts.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setAddToCartProducts(updatedProducts);
    setTotalPrice(totalPrice + product.price);
  };

  const removeQuantity = (product) => {
    if (product.quantity > 1) {
      const updatedProducts = addToCartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setAddToCartProducts(updatedProducts);
      setTotalPrice(totalPrice - product.price);
    } else {
      const filteredProducts = addToCartProducts.filter((item) => item.id !== product.id);
      setAddToCartProducts(filteredProducts);
      setTotalPrice(totalPrice - product.price);
    }
  };

  const deleteProduct = (product) => {
    let updatedPrice = product.quantity * product.price
    let filteredProducts = addToCartProducts.filter((item) => item.id !== product.id);
    setAddToCartProducts(filteredProducts);
    setTotalPrice(totalPrice - updatedPrice);
  }

  const addToCart = (product) => {
    let index = addToCartProducts.findIndex((element) => element.id === product.id);

    if (index !== -1) {
      const updatedCart = addToCartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setAddToCartProducts(updatedCart);
    } else {
      setAddToCartProducts([...addToCartProducts, { ...product, quantity: 1 }]);
    }

    setTotalPrice(totalPrice + product.price);
  };

  return (
    <CartContext.Provider value={{ addQuantity, removeQuantity, addToCart, addToCartProducts, totalPrice, handleHamburgerToggle, isActive, deleteProduct }} >
      {props.children}
    </ CartContext.Provider >)
}
