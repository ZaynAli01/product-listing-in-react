export const renderStar = (rating) => {
  let stars = []
  let roundRating = Math.round(rating)
  for (let i = 0; i < roundRating; i++) {
    stars.push(<i className="fa-solid fa-star text-warning"></i>)
  }

  for (let j = 0; j < 5 - roundRating; j++) {
    stars.push(<i className="fa-regular fa-star"></i>)
  }
  return stars
}

