import React, { useState, useEffect, useContext, useRef } from 'react';
import './style.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import CartContext from '../../contextApi/CartContext'

const productUrl = 'https://fakestoreapi.com/products';


export default function Card() {

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const a = useContext(CartContext)

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let data = await fetch(productUrl)
      .then((res) => res.json())
      .then((data) => data);
    setProducts(data);
  };

  return (
    <div className={`${a.isActive ? 'active' : ''} container cards-sec`} >
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
                    {item.description.slice(0, 130)} ...<button className="btn text-primary" >
                      read more
                    </button>
                  </p>
                  <div className="price">Rs. {item.price}</div>
                  <div className="rating mb-2">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>
                  <a href="#" className="btn btn-primary text-decoration-none" onClick={() => a.addToCart(item)}>
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
}
