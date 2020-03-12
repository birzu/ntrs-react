import React from 'react';

import './ReviewContainer.styles.scss';

const Star = ({ width, size }) => {
  return (
    <div
      className="review-container__star-wrapper"
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      <span className="review-container__star review-container__star--unfilled"></span>
      <span
        style={{ width }}
        className="review-container__star review-container__star--filled"
      ></span>
    </div>
  );
};

const ReviewContainer = ({ rating, cls, size }) => {
  const starSize = size === 'md' ? 2.1 : 3;
  return (
    <div className={`review-container ${cls}`}>
      {[1, 2, 3, 4, 5].map((current, idx) => {
        if (rating >= current) {
          return <Star width={'100%'} size={starSize} key={idx} />;
        }
        // if rating is less than current
        const width = (rating - (current - 1)) * 100;
        let calculatedWidth;
        if (width < 48) {
          calculatedWidth = width * 1.17;
        } else if (width > 52) {
          calculatedWidth = width * 0.93;
        } else {
          calculatedWidth = width;
        }
        return <Star width={`${calculatedWidth}%`} size={starSize} key={idx} />;
      })}
    </div>
  );
};

export default ReviewContainer;
