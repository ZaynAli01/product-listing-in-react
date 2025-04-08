import React from 'react'
import './style.css'
import { renderStar } from '../../../utils/ratingHelper';


export default function ReviewSection({ reviews }) {

  return (
    <section style={{
      color: '#000;', backgroundColor: "#f3f2f2;"
    }} className='mt-5'>
      <div class="container py-5">
        <div class="row d-flex justify-content-center">
          <hr />
          <div class="col-md-10 col-xl-8 text-center">
            <h3 class="fw-bold mb-4">Reviews</h3>
          </div>
        </div>

        <div class="row text-center">
          {reviews?.map((review, index) => (
            <div class="col-md-4 mb-4 mb-md-0" key={index}>
              <div class="card">
                <div class="card-body py-4 mt-2">
                  <h5 class="font-weight-bold">{review.reviewerName}</h5>
                  <h6 class="font-weight-bold my-3">{`Email : ${review.reviewerEmail}`}</h6>
                  <ul class="list-unstyled d-flex justify-content-center">
                    {renderStar(review.rating)}
                  </ul>
                  <p class="mb-2">
                    <i class="fas fa-quote-left pe-2"></i>
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >

  )
}
