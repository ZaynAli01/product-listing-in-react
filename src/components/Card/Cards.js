import React, { useState, useEffect } from 'react'
import './style.css'

const productUrl = 'https://fakestoreapi.com/products'

export default function Cards() {

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    let data = await fetch(productUrl).then((res) => res.json()).then(
      (data) => data
    )

    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [])


  return (
    <div className="container cards-sec">

      <div className="row border">
        {products.map((item, index) => {
          return (
            <div className="col-md-4 my-3 " key={index}>
              <div data-aos="fade-left" className="card shadow d-flex flex-column justify-content-between align-items-center" style={{ width: '22rem' }}>
                <div className="card-img-box">
                  <img src={item.image} className="card-img-top" alt="..." />
                </div>
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title">{item.title.slice(0, 53)}...</h5>
                  <p className="card-text flex-grow-1">{item.description.slice(0, 131)}... <a href="#" className='text-decoration-none'>read More</a></p>
                  <div className="price">Rs. {item.price}</div>
                  <div className="rating mb-2">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>
                  <a href="/" className="btn btn-primary mt-auto">Add to Cart</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div >
  )
}
