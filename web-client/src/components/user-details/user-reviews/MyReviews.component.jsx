import React from 'react';

import ReviewContainer from '../../review-stars-container/ReviewContainer.component';

import './MyReviews.styles.scss';
import TourImg from '../../../assets/forest-hiker.jpg';

const UserReview = () => {
  return (
    <div className="user-review">
      <div className="user-review__tour-img-wrapper">
        <img
          className="user-review__tour-img"
          src={TourImg}
          alt="forest hiker tour"
        ></img>
      </div>
      <div className="user-review__tour-details">
        <h3 className="user-review__tour-name">The Forest Hiker</h3>
      </div>
      <div className="user-review__tour-duration">
        <span className="user-review__tour-duration-from">
          {new Date().toLocaleDateString()}
        </span>
        <span></span>
        <span className="user-review__tour-duration-to">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="user-review__review-rating-stars">
        <ReviewContainer rating={4} />
      </div>
      <div className="user-review__review-body-wrapper">
        <p className="user-review__review-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
          feugiat diam. Integer posuere nulla at nunc semper sagittis. felis
        </p>
      </div>
      <div className="user-review__btn-edit">Edit</div>
    </div>
  );
};

const UserReviewContainer = () => {
  return (
    <div className="user-reviews-container">
      <h2 className="user-reviews-container__heading">My Reviews</h2>
      {new Array(3).fill(1).map(el => (
        <UserReview />
      ))}
    </div>
  );
};

export default UserReviewContainer;
