import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import ReviewSection from './reviewSection/ReviewSection';
import { renderStar } from '../../utils/ratingHelper';
import CartContext from '../../contextApi/CartContext';


function ProductDetail(WrappedComponent) {
  return function ProductDetailWrapper(props) {
    const { id } = useParams();

    const { addCartProduct } = useContext(CartContext)



    const [productDetail, setProductDetail] = useState({})

    useEffect(() => {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProductDetail(data));
    }, [id])

    const extraInfo = (
      <>
        {/* content */}
        <div data-aos="fade-left" className="product-detail">
          <section className="py-5">
            <div className="container m-0">
              <div className="row gx-5">
                <aside className="col-lg-6">
                  <div className="border rounded-4 mb-3 d-flex justify-content-center h-100">
                    <a
                      data-fslightbox="mygalley"
                      className="rounded-4 d-flex justify-content-center align-items-center"
                      target="_blank"
                      data-type="image"
                      href={productDetail.thumbnail}
                    >
                      <img
                        style={{ maxWidth: '100%', height: '100%', margin: 'auto' }}
                        className="rounded-4 fit"
                        src={productDetail.thumbnail}
                        alt="Product"
                      />
                    </a>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    {productDetail.images?.map((img, idx) => (
                      <a
                        key={idx}
                        data-fslightbox="mygalley"
                        className="border mx-1 rounded-2 item-thumb"
                        target="_blank"
                        data-type="image"
                        href={img}
                      >
                        <img
                          width="60"
                          height="60"
                          className="rounded-2"
                          src={img}
                          alt={`Thumb ${idx}`}
                        />
                      </a>
                    ))}
                  </div>
                </aside>

                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title text-dark">
                      {productDetail.title}
                    </h4>

                    <div className="d-flex flex-row my-3">
                      <div className="text-warning mb-1 me-2">
                        {renderStar(productDetail.rating)}
                        <span className="ms-1">{productDetail.rating}</span>
                      </div>
                      <span className="text-muted">
                        <i className="fas fa-shopping-basket fa-sm mx-1"></i>{productDetail.stock} Stock
                      </span>
                      <span className="text-success ms-2">{productDetail.availabilityStatus}</span>
                    </div>

                    <div className="mb-3">
                      <span className="h5">{`Rs ${productDetail.price}`}</span>
                      <span className="text-muted"></span>
                    </div>

                    <p>
                      {productDetail.description}
                    </p>

                    <div className="row">
                      <dt className="col-3">category:</dt>
                      <dd className="col-9">{productDetail.category}</dd>

                      <dt className="col-3">Brand:</dt>
                      <dd className="col-9">{productDetail.brand ? productDetail.brand : 'NA'}</dd>

                      <dt className="col-3">shipping:</dt>
                      <dd className="col-9">{productDetail.shippingInformation}</dd>

                      <dt className="col-3">returnPolicy:</dt>
                      <dd className="col-9">{productDetail.returnPolicy}</dd>
                    </div>

                    <hr />

                    <a href="#" className="btn btn-warning shadow-0 me-2">Buy now</a>
                    <a href="#" className="btn btn-primary shadow-0 me-2" onClick={() => addCartProduct(productDetail)}>
                      <i className="me-1 fa fa-shopping-basket"></i> Add to cart
                    </a>
                    <a href="#" className="btn btn-light border border-secondary py-2 icon-hover px-3">
                      <i className="me-1 fa fa-heart fa-lg"></i> Save
                    </a>
                  </div>
                </main>
              </div>
            </div>
            <ReviewSection reviews={productDetail.reviews} renderStar={renderStar} />
          </section>
        </div>
      </>
    );

    return (
      <>
        <WrappedComponent {...props} />
        {extraInfo}
      </>
    );
  };
}

export default ProductDetail(Dashboard);
