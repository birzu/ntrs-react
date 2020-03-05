import React from 'react';

import './ReviewContainer.styles.scss';

const Star = ({ width }) => {
  return (
    <div className="review-container__star-wrapper">
      <span className="review-container__star review-container__star--unfilled"></span>
      <span
        style={{ width }}
        className="review-container__star review-container__star--filled"
      ></span>
    </div>
  );
};

const ReviewContainer = ({ rating, cls }) => (
  <div className={`review-container ${cls}`}>
    {[1, 2, 3, 4, 5].map((current, idx) => {
      if (rating >= current) {
        return <Star width={'100%'} />;
      }
      const width = (rating - (current - 1)) * 100;
      const calculatedWidth = width < 50 ? width * 1.15 : width * 0.86;
      return <Star width={`${calculatedWidth}%`} />;
    })}
    {/*
    <div className="review-container__star-wrapper">
      <span className="review-container__star review-container__star--unfilled"></span>
      <span className="review-container__star review-container__star--filled"></span>
    </div>
    <div className="review-container__star-wrapper">
      <span className="review-container__star review-container__star--unfilled"></span>
      <span className="review-container__star review-container__star--filled"></span>
    </div>
    <div className="review-container__star-wrapper">
      <span className="review-container__star review-container__star--unfilled"></span>
      <span className="review-container__star review-container__star--filled"></span>
    </div>
    <div className="review-container__star-wrapper">
      <span className="review-container__star review-container__star--unfilled"></span>
      <span className="review-container__star review-container__star--filled"></span>
    </div>
		*/}
  </div>
);

export default ReviewContainer;
