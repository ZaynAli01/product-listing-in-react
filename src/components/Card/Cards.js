import React, { useState, useEffect } from 'react';
import './style.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Cart from '../cart/Cart';

const productUrl = 'https://fakestoreapi.com/products';

export default function Cards() {
  useEffect(() => {
    Aos.init();
  }, []);

  const [products, setProducts] = useState([]);
  const [addToCartProducts, setAddToCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const getProducts = async () => {
    let data = await fetch(productUrl)
      .then((res) => res.json())
      .then((data) => data);
    setProducts(data);
  };


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container cards-sec">
      <Cart cartProducts={addToCartProducts} addQuantity={addQuantity} removeQuantity={removeQuantity} totalPrice={totalPrice} />

      <div className="row">
        {products.map((item, index) => {
          return (
            <div data-aos="fade-left" className="col-md-4 my-3 " key={index}>
              <div className="card shadow d-flex flex-column justify-content-between align-items-center" style={{ width: '22rem' }}>
                <div className="card-img-box">
                  <img src={item.image} className="card-img-top" alt="..." />
                </div>
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title">{item.title.slice(0, 53)}...</h5>
                  <p className="card-text flex-grow-1">
                    {item.description.slice(0, 131)}...{' '}
                    <a href="#" className="text-decoration-none">
                      read More
                    </a>
                  </p>
                  <div className="price">Rs. {item.price}</div>
                  <div className="rating mb-2">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>
                  <a href="#" className="btn btn-primary mt-auto" onClick={() => addToCart(item)}>
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
