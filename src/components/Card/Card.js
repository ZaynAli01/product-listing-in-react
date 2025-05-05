import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom'
import './style.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import CartContext from '../../contextApi/CartContext'
import Dashboard from '../../pages/Dashboard';
import { renderStar } from '../../utils/ratingHelper';

const productUrl = 'https://dummyjson.com/products';


function Card() {

  const Navigate = useNavigate()

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const cart = useContext(CartContext)

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let data = await fetch(productUrl)
      .then((res) => res.json())
      .then((data) => data.products);
    setProducts(data);
  };

  const productDetail = (id) => {
    Navigate(`/productDetail/${id}`)
  }

  return (
    <div className={`${cart.isActive ? 'active' : ''} container cards-sec`} >
      <div className="row">
        {products.map((item, index) => {
          return (
            <div data-aos="fade-left" className="col-md-4 my-3 " key={index}>
              <div className="card shadow d-flex flex-column justify-content-between align-items-center" role='button' style={{ width: '22rem' }}>
                <div className="card-img-box" onClick={() => productDetail(item.id)}>
                  <img src={item.thumbnail} className="card-img-top" alt="..." />
                </div>
                <div className="card-body d-flex flex-column flex-grow-1">
                  <div onClick={() => productDetail(item.id)}>
                    <h5 className="card-title">{item.title.slice(0, 53)}...</h5>
                    <p className="card-text flex-grow-1">
                      {item.description.slice(0, 130)} ...<button className="btn text-primary" >
                        read more
                      </button>
                    </p>
                    <div className="price">Rs. {item.price}</div>
                    <div className="rating mb-2">
                      {renderStar(item.rating)}
                    </div>
                  </div>
                  <a href="#" className="btn btn-primary text-decoration-none" onClick={() => cart.addCartProduct(item)}>
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

const DashboardProductPage = () => <Dashboard  > <Card /> </Dashboard>


export default DashboardProductPage;